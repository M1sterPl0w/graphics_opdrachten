using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Lecture3
{
    public partial class Form1 : Form
    {
        AxisX x_axis;
        AxisY y_axis;
        AxisZ z_axis;
        Cube c;

        int phase;
        System.Timers.Timer s;

        bool xRotationForward = true;
        float xRotation = 0;
        bool yRotationForward = true;
        float yRotation = 0;
        float zRotation = 0;
        
        public Form1()
        {
            InitializeComponent();
            this.Width = 800;
            this.Height = 600;

            x_axis = new AxisX(2);
            y_axis = new AxisY(2);
            z_axis = new AxisZ(2);
            c = new Cube(Color.Black);
            phase = 0;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            List<Vector> vb;
            base.OnPaint(e);

            Start(e.Graphics);

            this.PhiLabel.Text = Transformations.phi.ToString();
            this.ThetaLabel.Text = Transformations.theta.ToString();
            this.ScaleLabel.Text = c.vertexbuffer[0].x.ToString();
            this.RotateXLabel.Text = xRotation.ToString();
            this.RotateYLabel.Text = yRotation.ToString();
            this.RotateZLabel.Text = zRotation.ToString();
            this.RLabel.Text = Transformations.r.ToString();
            this.DLabel.Text = Transformations.d.ToString();

            vb = Transformations.ViewTransformation(c.vertexbuffer);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);
            c.Draw(e.Graphics, vb);
        }
        
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (keyData == Keys.Escape)
            {
                this.Close();
                return true;
            }
            return base.ProcessCmdKey(ref msg, keyData);
        }

        private void Start(Graphics g)
        {
            List<Vector> vb;
            vb = Transformations.ViewTransformation(x_axis.vb);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);
            x_axis.Draw(g, vb);

            vb = Transformations.ViewTransformation(y_axis.vb);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);
            y_axis.Draw(g, vb);
                
            vb = Transformations.ViewTransformation(z_axis.vb);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);
            z_axis.Draw(g, vb);
        }

        private void ModelTrans(Func<float, Matrix> func, float degrees)
        {
            c.vertexbuffer = c.vertexbuffer.Select(i => func(degrees) * i).ToList();
        }

        private void Form1_KeyPress(object sender, KeyPressEventArgs e)
        {
            switch (e.KeyChar)
            {
                case 'x':
                    ModelTrans(Matrix.RotateX, 1);
                    xRotation++;
                    break;
                case 'X':
                    ModelTrans(Matrix.RotateX, -1);
                    xRotation--;
                    break;
                case 'y':
                    ModelTrans(Matrix.RotateY, 1);
                    yRotation++;
                    break;
                case 'Y':
                    ModelTrans(Matrix.RotateY, -1);
                    yRotation--;
                    break;
                case 'z':
                    ModelTrans(Matrix.RotateZ, 1);
                    zRotation++;
                    break;
                case 'Z':
                    ModelTrans(Matrix.RotateZ, -1);
                    zRotation--;
                    break;
                case 's':
                    ModelTrans(Matrix.Scale3D, 1.1f);
                    break;
                case 'S':
                    ModelTrans(Matrix.Scale3D, 0.9f);
                    break;
                case 'c':
                    Reset();
                    break;
                case 'a':
                    StartAnimation();
                    break;
                case 'A':
                    StopAnimation();
                    break;
            }
            Invalidate();
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            switch(e.KeyValue)
            {
                // PgUp
                case 33:
                    Translate(new Vector(0, 0, 0.1f));
                    break;
                // PgDown
                case 34:
                    Translate(new Vector(0, 0, -0.1f));
                    break;
                // Left
                case 37:
                    Translate(new Vector(-0.1f, 0, 0));
                    break;
                // Up
                case 38:
                    Translate(new Vector(0, 0.1f, 0));
                    break;
                // Right
                case 39:
                    Translate(new Vector(0.1f, 0, 0));
                    break;
                // Down
                case 40:
                    Translate(new Vector(0, -0.1f, 0));
                    break;
            }
            Invalidate();
        }

        private void Translate(Vector v)
        {
            c.vertexbuffer = c.vertexbuffer.Select(i => Matrix.Translate(v) * i).ToList();
        }

        private void Reset()
        {
            c = new Cube(Color.Black);
            x_axis = new AxisX(2);
            y_axis = new AxisY(2);
            z_axis = new AxisZ(2);
            Transformations.phi = -10;
            Transformations.theta = -100;
            xRotation = 0;
            yRotation = 0;
            zRotation = 0;
        }

        private void StartAnimation()
        {
            if (phase == 0)
            {
                s = new System.Timers.Timer();
                s.Start();
                phase = 1;
                s.Interval = 50;
                s.Elapsed += Animation;
            }
        }

        private void StopAnimation()
        {
            if(phase != 0)
            {
                phase = 0;
                Reset();
            }
        }
        private void Animation(Object source, System.Timers.ElapsedEventArgs e)
        {
            // Phase 1
            if (phase == 1)
            {
                ModelTrans(Matrix.Scale3D, 1.01f);
                Invalidate();
                Transformations.theta--;
                if (c.vertexbuffer[0].x / 1.5 >= 1)
                    phase = 2;
            }

            // Phase 2
            else if (phase == 2)
            {
                Transformations.theta--;
                if (xRotationForward)
                {
                    ModelTrans(Matrix.RotateX, 1);
                    xRotation++;
                    if (xRotation == 45)
                        xRotationForward = false;
                }
                else
                {
                    ModelTrans(Matrix.RotateX, -1);
                    if(xRotation == 1)
                        phase = 3;
                    xRotation--;
                }
                Invalidate();
            }

            // Phase 3
            else if(phase == 3)
            {
                
                Transformations.phi++;
                if (yRotationForward)
                {
                    ModelTrans(Matrix.RotateY, 1);
                    yRotation++;
                    if (yRotation == 45)
                        yRotationForward = false;
                }
                else
                {
                    ModelTrans(Matrix.RotateY, -1);
                    if (yRotation == 1)
                        phase = 4;
                    yRotation--;
                }
                Invalidate();
            }

            // Phase 4 (restore phi and theta)
            else if(phase == 4)
            {
                if (Transformations.theta != -100)
                    Transformations.theta++;
                if (Transformations.phi != -10)
                    Transformations.phi--;
                if (Transformations.theta == -100 && Transformations.phi == -10)
                    phase = 1;
                Invalidate();
            }
        }
    }
}
