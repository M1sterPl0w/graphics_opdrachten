using System;

namespace Lecture3
{
    public class Vector
    {
        public float x { get; set; }
        public float y { get; set; }
        public float z { get; set; }
        public float w { get; set; }
        
        public float this[int key]
        {
            get
            {
                if (key == 0)
                    return x;
                else if (key == 1)
                    return y;
                else if (key == 2)
                    return z;
                else if (key == 3)
                    return w;
                else
                    throw new Exception("Index does not exists");
            }
            set
            {
                if (key == 0)
                    x = value;
                else if (key == 1)
                    y = value;
                else if (key == 2)
                    z = value;
            }
        }


        public Vector(float x = 0, float y = 0, float z = 0)
        {
            this.x = x;
            this.y = y;
            this.w = 1;
            this.z = z;
        }

        public static Vector operator +(Vector A, Vector B)
        {
            return new Vector((A.x + B.x), (A.y + B.y), (A.z + B.z));
        }
        public override string ToString()
        {
            return $"({x},{y},{z})";
        }

        public static Matrix ToMatrix(Vector v)
        {
            Matrix temp  = new Matrix();
            temp.array = new float[,] { { v.x }, { v.y }, { v.z }, { v.w } };
            return temp;
        }
    }
}