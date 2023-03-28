using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login_Uygulaması
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int hakSayisi = 3;

            while (true)
            {
                Console.WriteLine("Kullanıcı adınızı giriniz");
                string kullanıcıAdi = Console.ReadLine();

                Console.WriteLine("Şifrenizi giriniz");
                string sifre = Console.ReadLine();

                if (kullanıcıAdi == "hüseyin" && sifre == "123")
                {
                    Console.WriteLine("Tebrikler başarılı bir şekilde giriş yaptınız :)");
                    break;
                }
                else
                {
                    Console.WriteLine("Kullanıcı adınız veya şifreniz hatalı");

                    if (hakSayisi > 0)
                    {
                        hakSayisi -= 1;

                    }
                    if (hakSayisi == 0)
                    {
                        Console.WriteLine("3 defa hatalı girişten dolayı hesabınız blokelendi");
                        break;
                    }
                }
            }
            Console.ReadLine();
        }
    }
}
