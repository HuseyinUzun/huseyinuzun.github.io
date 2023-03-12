using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MetroFramework;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace YakıtV2C
{
    public partial class Form1 : MetroFramework.Forms.MetroForm
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void metroButton1_Click(object sender, EventArgs e)
        {
            double sayi1, sayi2, sonuc;

            sayi1 = Convert.ToDouble(b1.Text);
            sayi2 = Convert.ToDouble(b3.Text);

            sonuc = sayi1 / sayi2;

            textBox1.Text = sonuc.ToString();

            double sayi3, sayi4, sonuc2;
            sayi3 = Convert.ToDouble(b1.Text);
            sayi4 = Convert.ToDouble(b4.Text);

            sonuc2 = sayi3 / sayi4;
            textBox2.Text = sonuc2.ToString();


            Raporlama.Items.Add("Tarih : " + DateTime.Text + " - " + "Alınan  Yakıt Tutarı: " + b1.Text + " - " + "Yapılan KM:" + b3.Text + " - " + "Alınan Litre:" + b4.Text);
            Raporlama.Items.Add("KM'de Yakılan Tl : " + textBox1.Text + " - " + "Yakıt Litre Ücreti : " + textBox2.Text);
        }
    }
}
