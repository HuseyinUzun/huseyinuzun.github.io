using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ücgenC
{
    internal class Program
    {
        static void Main(string[] args)
        {
            for (int i = 1; i<30; i++)
            {
                for (int k =i; k<40; k++)
                {
                Console.Write(" ");
                }

                for (int j = 1; j <=i; j++)
                {
                    Console.Write("*");
                    Console.Write(" ");
                }

                Console.WriteLine();
            }

            Console.ReadKey();

        }
    }
}
