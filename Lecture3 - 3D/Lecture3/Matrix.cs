using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lecture3
{
    public class Matrix
    {
        public float[,] array;

        public Matrix() { }

        public Matrix(int dimension0, int dimension1)
        {
            this.array = new float[dimension0, dimension1];
        }


        public Matrix(float m11, float m12, float m13,
                      float m21, float m22, float m23,
                      float m31, float m32, float m33)
        {
            this.array = new float[,] { { m11, m12, m13, 0 }, { m21, m22, m23, 0 }, { m31, m32, m33, 0 }, { 0, 0, 0, 1 } };
        }

        public static Matrix operator +(Matrix m1, Matrix m2)
        {
            if(m1.array.GetLength(0) != m2.array.GetLength(0) || m1.array.GetLength(1) != m2.array.GetLength(1))
            {
                throw new Exception("Matrices are not the same!");
            }
            Matrix newMatrix = new Matrix(m1.array.GetLength(0), m1.array.GetLength(1));
            for(int r = 0; r < m1.array.GetLength(1) - 1; r++)
            {
                for(int c = 0; c < m1.array.GetLength(0) - 1; c++)
                {
                    newMatrix.array[r, c] = m1.array[r, c] + m2.array[r, c];
                }
            }
            return newMatrix;
        }

        public static Matrix operator -(Matrix m1, Matrix m2)
        {
            if (m1.array.GetLength(0) != m2.array.GetLength(0) || m1.array.GetLength(1) != m2.array.GetLength(1))
            {
                throw new Exception("Matrices are not the same!");
            }
            Matrix newMatrix = new Matrix(m1.array.GetLength(0), m1.array.GetLength(1));
            for (int r = 0; r < m1.array.GetLength(1) - 1; r++)
            {
                for (int c = 0; c < m1.array.GetLength(0) - 1; c++)
                {
                    newMatrix.array[r, c] = m1.array[r, c] - m2.array[r, c];
                }
            }
            return newMatrix;
        }
        public static Matrix operator *(Matrix m1, float f)
        {
            Matrix newMatrix = new Matrix(m1.array.GetLength(0), m1.array.GetLength(1));
            for(int r = 0; r < m1.array.GetLength(0) - 1; r++)
            {
                for(int c = 0; c < m1.array.GetLength(1) - 1; c++)
                {
                    newMatrix.array[r, c] = m1.array[r, c] * f;
                }
            }
            return newMatrix;
        }

        public static Matrix operator *(float f, Matrix m1)
        {
            return m1 * f;
        }
        public static Matrix operator *(Matrix m1, Matrix m2)
        {
            if (m1.array.GetLength(1) != m2.array.GetLength(0))
            {
                throw new Exception("Matrix sizes are not the same");
            }
            Matrix newMatrix = new Matrix()
            {
                array = new float[m1.array.GetLength(0), m2.array.GetLength(1)]
            };
            for (int r = 0; r < m1.array.GetLength(0); r++)
            {
                for (int c = 0; c < m2.array.GetLength(1); c++)
                {
                    for (int i = 0; i < m1.array.GetLength(1); i++)
                    {
                        newMatrix.array[r, c] += m1.array[r, i] * m2.array[i, c];
                    }
                }
            }
            return newMatrix;
        }

        public static Vector operator *(Matrix m1, Vector v)
        {
            Matrix vector = Vector.ToMatrix(v);
            return Matrix.ToVector(m1 * vector);
        }

        public static Matrix Identity(int d)
        {
            return new Matrix(1, 0, 0, 
                              0, 1, 0, 
                              0, 0, 1);
        }

        public static Matrix Scale3D(float s)
        {
            return new Matrix(s, 0, 0,
                              0, s, 0,
                              0, 0, s);
        }

        public static Matrix RotateX(float degrees)
        {
            double rad = (Math.PI / 180) * degrees;
                return new Matrix(1, 0, 0, 
                                  0, (float)Math.Cos(rad), (float)-Math.Sin(rad), 
                                  0f, (float)Math.Sin(rad), (float)Math.Cos(rad));
        }

        public static Matrix RotateY(float degrees)
        {
            double rad = (Math.PI / 180) * degrees;
            return new Matrix((float)Math.Cos(rad), 0, (float)Math.Sin(rad),
                                  0, 1, 0,
                                  (float)-Math.Sin(rad), 0, (float)Math.Cos(rad));
        }

        public static Matrix RotateZ(float degrees)
        {
            double rad = (Math.PI / 180) * degrees;
            return new Matrix((float)Math.Cos(rad), (float)-Math.Sin(rad), 0,
                                  (float)Math.Sin(rad), (float)Math.Cos(rad), 0,
                                  0, 0, 1);
        }
            

        public static Matrix Translate(Vector t)
        {
            return new Matrix()
            {
                array = new float[,] { { 1, 0, 0, t.x},
                                        { 0, 1, 0, t.y},
                                        { 0, 0, 1, t.z},
                                        { 0, 0, 0, 1}}
            };
        }

        public static Vector ToVector(Matrix m)
        {
            Vector tmp = new Vector();
            for (int i = 0; i < m.array.GetLength(0); i++)
                tmp[i] = m.array[i, 0];

            return tmp;
        }

        public static Matrix Viewtransformation(float theta, float phi, float r)
        {
            double thetaRad = (Math.PI / 180) * theta;
            double phiRad = (Math.PI / 180) * phi;

            Matrix temp = new Matrix(-(float)Math.Sin(thetaRad), (float)Math.Cos(thetaRad), 0,
                              -(float)Math.Cos(thetaRad) * (float)Math.Cos(phiRad), -(float)Math.Cos(phiRad) * (float)Math.Sin(thetaRad), (float)Math.Sin(phiRad),
                              (float)Math.Cos(thetaRad) * (float)Math.Sin(phiRad), (float)Math.Sin(thetaRad) * (float)Math.Sin(phiRad), (float)Math.Cos(phiRad));
            temp.array[2, 3] = -r;

            return temp;
        }

        public static Matrix ProjectionTransformation(float d, float z)
        {
            float i = -(d / z);
            return new Matrix()
            {
                array = new float[,]
                {
                    { i, 0 , 0 , 0 },
                    { 0, i, 0, 0 }
                }
            };
        }
    }
}

