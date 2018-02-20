using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lecture3
{
    public class Cube
    {
        //          3----------2
        //         /|         /|
        //        / |        / |                z
        //       /  7-------/--6                |
        //      4--/-------1  /                 ----x
        //      | /        | /                 /
        //      |/         |/                  y
        //      8----------5

        private const int size = 1;
        public List<Vector> vertexbuffer = new List<Vector>
        {
            new Vector( 1.0f,  1.0f, 1.0f),     //1
            new Vector( 1.0f, -1.0f, 1.0f),     //2
            new Vector(-1.0f, -1.0f, 1.0f),     //3
            new Vector(-1.0f,  1.0f, 1.0f),     //4

            new Vector( 1.0f,  1.0f, -1.0f),    //5
            new Vector( 1.0f, -1.0f, -1.0f),    //6
            new Vector(-1.0f, -1.0f, -1.0f),    //7
            new Vector(-1.0f,  1.0f, -1.0f),    //8

            new Vector( 1.2f,  1.2f, 1.2f),     //1
            new Vector( 1.2f, -1.2f, 1.2f),     //2
            new Vector(-1.2f, -1.2f, 1.2f),     //3
            new Vector(-1.2f,  1.2f, 1.2f),     //4

            new Vector( 1.2f,  1.2f, -1.2f),    //5
            new Vector( 1.2f, -1.2f, -1.2f),    //6
            new Vector(-1.2f, -1.2f, -1.2f),    //7
            new Vector(-1.2f,  1.2f, -1.2f)     //8
        };

        Color col;

        public Cube(Color c) { col = c; }

        public void Draw(Graphics g, List<Vector> vb)
        {
            Pen pen = new Pen(col, 3f);
            g.DrawLine(pen, vb[0].x, vb[0].y, vb[1].x, vb[1].y);    //1 -> 2
            g.DrawLine(pen, vb[1].x, vb[1].y, vb[2].x, vb[2].y);    //2 -> 3
            g.DrawLine(pen, vb[2].x, vb[2].y, vb[3].x, vb[3].y);    //3 -> 4
            g.DrawLine(pen, vb[3].x, vb[3].y, vb[0].x, vb[0].y);    //4 -> 1

            g.DrawLine(pen, vb[4].x, vb[4].y, vb[5].x, vb[5].y);    //5 -> 6
            g.DrawLine(pen, vb[5].x, vb[5].y, vb[6].x, vb[6].y);    //6 -> 7
            g.DrawLine(pen, vb[6].x, vb[6].y, vb[7].x, vb[7].y);    //7 -> 8
            g.DrawLine(pen, vb[7].x, vb[7].y, vb[4].x, vb[4].y);    //8 -> 5

            pen.DashStyle = DashStyle.DashDot;
            g.DrawLine(pen, vb[0].x, vb[0].y, vb[4].x, vb[4].y);    //1 -> 5
            g.DrawLine(pen, vb[1].x, vb[1].y, vb[5].x, vb[5].y);    //2 -> 6
            g.DrawLine(pen, vb[2].x, vb[2].y, vb[6].x, vb[6].y);    //3 -> 7
            g.DrawLine(pen, vb[3].x, vb[3].y, vb[7].x, vb[7].y);    //4 -> 8

            Font font = new Font("Arial", 12, FontStyle.Bold);
            for (int i = 0; i < 8; i++)
            {
                PointF p = new PointF(vb[i + 8].x, vb[i + 8].y);
                g.DrawString(i.ToString(), font, Brushes.Black, p);
            }
        }
    }
}
