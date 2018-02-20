using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lecture3
{
    public class Transformations
    {

        public static float theta = -100;
        public static float phi = -10;
        public static float r = 10;
        public static float d = 800;

        public static List<Vector> ViewTransformation(List<Vector> vb)
        {
            List<Vector> tmp = vb.Select(i => Matrix.Viewtransformation(theta, phi, r) * i).ToList();
            return tmp;
        }

        public static List<Vector> ProjectionTransformation(List<Vector> vb)
        {
            List<Vector> tmp = vb.Select(i => Matrix.ToVector(Matrix.ProjectionTransformation(d, i.z) * (Vector.ToMatrix(i)))).ToList();
            return tmp;
        }

        public static List<Vector> ViewPortTransformation(float width, float height, List<Vector> vb)
        {
            List<Vector> result = new List<Vector>();
            float cx = width / 2;
            float cy = height / 2;
            foreach (Vector v in vb)
            {
                Vector v2 = new Vector(v.x + cx, cy - v.y);
                result.Add(v2);
            }
            return result;
        }

    }
}
