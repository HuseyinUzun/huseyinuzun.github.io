using System;

class ATM
{
    static void Main(string[] args)
    {
        decimal balance = 1000; // Başlangıç bakiyesi
        decimal amount;
        string option;
        //Menü Seçim Ekranı
        do
        {
            Console.WriteLine("HO|BANK ATM Uygulamasına Hoşgeldiniz!");
            Console.WriteLine("1. Bakiyeni Görüntüle");
            Console.WriteLine("2. Para Yatır");
            Console.WriteLine("3. Para Çek");
            Console.WriteLine("4. Çıkış");


            Console.WriteLine("Seçiminiz: ");
            option = Console.ReadLine();

            switch (option)
            {
                case "1":
                    Console.WriteLine("Bakiyeniz: " + balance);
                    break;
                case "2":
                    Console.Write("Yatırmak istediğiniz tutar: ");
                    amount = decimal.Parse(Console.ReadLine());
                    balance += amount;
                    Console.WriteLine("Para yatırma işlemi başarıyla gerçekleşti.");
                    break;
                case "3":
                    Console.Write("Çekmek istediğiniz tutar: ");
                    amount = decimal.Parse(Console.ReadLine());
                    if (amount > balance)
                    {
                        Console.WriteLine("Yetersiz bakiye.");
                    }
                    else
                    {
                        balance -= amount;
                        Console.WriteLine("Para çekme işlemi başarıyla gerçekleşti.");
                    }
                    break;
                case "4":
                    Console.WriteLine("Çıkış yaptınız. Teşekkür ederiz.");
                    break;
                default:
                    Console.WriteLine("Geçersiz seçim. Lütfen tekrar deneyin.");
                    break;
            }
            Console.WriteLine("");
            Console.WriteLine("*******Yeni işleminiz için yönlediriliyorsunuz.********");
            Console.WriteLine("");
        } while (option != "4");
    }
}
