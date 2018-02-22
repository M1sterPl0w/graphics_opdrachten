using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace Lecture3
{
	public partial class Form1 : Form
    {
        private AxisX _xAxis;
	    private AxisY _yAxis;
	    private AxisZ _zAxis;
        private Cube _c;

	    private int _phase;
	    private System.Timers.Timer _timer;

	    private bool _xRotationForward = true;
	    private float _xRotation;
	    private bool _yRotationForward = true;
	    private float _yRotation;
	    private float _zRotation;
	    private double _scale;

        public Form1()
        {
            InitializeComponent();
            Width = 800;
            Height = 600;

            _xAxis = new AxisX(2);
            _yAxis = new AxisY(2);
            _zAxis = new AxisZ(2);
            _c = new Cube(Color.Black);
            _phase = 0;
            _scale = 1;

            SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            List<Vector> vb;
            base.OnPaint(e);

            Start(e.Graphics);

            PhiLabel.Text = Transformations.phi.ToString();
            ThetaLabel.Text = Transformations.theta.ToString();
            ScaleLabel.Text = Math.Round(_scale, 2).ToString();
            RotateXLabel.Text = _xRotation.ToString();
            RotateYLabel.Text = _yRotation.ToString();
            RotateZLabel.Text = _zRotation.ToString();
            RLabel.Text = Transformations.r.ToString();
            DLabel.Text = Transformations.d.ToString();

            vb = Transformations.ViewTransformation(_c.Vertexbuffer);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);

            CalculateScale(_c.Vertexbuffer[0], _c.Vertexbuffer[1]);
            _c.Draw(e.Graphics, vb);
        }
        
        private void CalculateScale(Vector a, Vector b)
        {
            _scale = Math.Sqrt(Math.Pow(b.x - a.x, 2) + Math.Pow(b.y - a.y, 2) + Math.Pow(b.z - a.z, 2)) - 1;
        }

        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (keyData == Keys.Escape)
            {
                Close();
                return true;
            }
            return base.ProcessCmdKey(ref msg, keyData);
        }

        private void Start(Graphics g)
        {
            List<Vector> vb;
            vb = Transformations.ViewTransformation(_xAxis.vb);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);
            _xAxis.Draw(g, vb);

            vb = Transformations.ViewTransformation(_yAxis.vb);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);
            _yAxis.Draw(g, vb);
                
            vb = Transformations.ViewTransformation(_zAxis.vb);
            vb = Transformations.ProjectionTransformation(vb);
            vb = Transformations.ViewPortTransformation(800, 600, vb);
            _zAxis.Draw(g, vb);
        }

        private void Transform(Func<float, Matrix> func, float value)
        {
            _c.Vertexbuffer = _c.Vertexbuffer.Select(i => func(value) * i).ToList();
        }

        private void Form1_KeyPress(object sender, KeyPressEventArgs e)
        {
            switch (e.KeyChar)
            {
                case 'x':
                    Transform(Matrix.RotateX, 1);
                    _xRotation++;
                    break;
                case 'X':
                    Transform(Matrix.RotateX, -1);
                    _xRotation--;
                    break;
                case 'y':
                    Transform(Matrix.RotateY, 1);
                    _yRotation++;
                    break;
                case 'Y':
                    Transform(Matrix.RotateY, -1);
                    _yRotation--;
                    break;
                case 'z':
                    Transform(Matrix.RotateZ, 1);
                    _zRotation++;
                    break;
                case 'Z':
                    Transform(Matrix.RotateZ, -1);
                    _zRotation--;
                    break;
                case 's':
                    Transform(Matrix.Scale3D, 1.01f);
                    break;
                case 'S':
                    Transform(Matrix.Scale3D, 0.99f);
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
            _c.Vertexbuffer = _c.Vertexbuffer.Select(i => Matrix.Translate(v) * i).ToList();
        }

        private void Reset()
        {
            _c = new Cube(Color.Black);
            _xAxis = new AxisX(2);
            _yAxis = new AxisY(2);
            _zAxis = new AxisZ(2);
            Transformations.phi = -10;
            Transformations.theta = -100;
            _xRotation = 0;
            _yRotation = 0;
            _zRotation = 0;
        }

        private void StartAnimation()
        {
            Reset();
	        _timer = new System.Timers.Timer();
	        _timer.Start();
	        _phase = 1;
	        _timer.Interval = 50;
	        _timer.Elapsed += Animation;
        }

        private void StopAnimation()
        {
	        if (_phase == 0) return;
	        _phase = 0;
	        Reset();
        }

        private void Animation(Object source, System.Timers.ElapsedEventArgs e)
        {
	        // Phase 1
	        switch (_phase)
	        {
		        case 1:
			        if (_scale >= 1.5)
				        _phase = 2;
			        else
			        {
				        Transform(Matrix.Scale3D, 1.01f);
				        Invalidate();
				        Transformations.theta--;
			        }
			        break;
		        case 2:
			        Transformations.theta--;
			        if (_xRotationForward)
			        {
				        _xRotation++;
				        Transform(Matrix.RotateX, 1);
				        if (_xRotation == 45)
					        _xRotationForward = false;
			        }
			        else
			        {
				        _xRotation--;
				        Transform(Matrix.RotateX, -1);
				        if(_xRotation == 0)
				        {
					        _phase = 3;
					        _xRotationForward = true;
				        }
			        }
			        Invalidate();
			        break;
		        case 3:
			        Transformations.phi++;
			        if (_yRotationForward)
			        {
				        _yRotation++;
				        Transform(Matrix.RotateY, 1);
				        if (_yRotation == 45)
					        _yRotationForward = false;
			        }
			        else
			        {
				        _yRotation--;
				        Transform(Matrix.RotateY, -1);
				        if (_yRotation == 0)
				        {
					        _yRotationForward = true;
					        _phase = 4;
				        }
			        }
			        Invalidate();
			        break;
		        case 4:
			        if (Transformations.theta != -100)
				        Transformations.theta++;
			        if (Transformations.phi != -10)
				        Transformations.phi--;
			        if (Transformations.theta == -100 && Transformations.phi == -10)
				        _phase = 1;
			        Invalidate();
			        break;
	        }
        }
    }
}
