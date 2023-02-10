using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {

            int hak = 5;
            int tutulan = (new Random()).Next(1,100);
            int sayi = 0;

            while (hak > 0) 
            {
                Console.Write("Bir sayı giriniz : ");
                sayi = int.Parse(Console.ReadLine());
                hak = hak - 1;

                if (hak == 0)
                {
                    Console.WriteLine("Hakkınız bitti");
                    Console.WriteLine("Tutulan sayı : {0}", tutulan);
                    break;
                }



                if (sayi ==  tutulan)
                {
                    //kullanıcının tahmini doğrudur.
                    Console.WriteLine("Tebrikler.{0}.hakkınızda bildiniz.", 5 - hak);
                    break;

                }
                else
                {
                    if (sayi > tutulan) 
                    {
                        Console.WriteLine("Daha küçük bir değer giriniz.");
                    }
                    else 
                    {
                        Console.WriteLine("Daha büyük bir değer giriniz.");
                    }
                }

                Console.WriteLine("{0} hakkınız kaldı.", hak);

                if (hak == 0)
                {
                    Console.WriteLine("Hakkınız bitti");
                    Console.WriteLine("Tutulan sayı : {0}", tutulan);
                    break;
                }
            }
            Console.ReadKey(); 
        }
    }
}
