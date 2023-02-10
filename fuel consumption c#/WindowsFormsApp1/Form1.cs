using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        

       


        private void button2_Click(object sender, EventArgs e)

        {
            textBox3.Text = maskedTextBox2.Text;
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            double sayi1, sayi2, sonuc;

            sayi1 = Convert.ToDouble(maskedTextBox2.Text);
            sayi2 = Convert.ToDouble(maskedTextBox3.Text);

            sonuc = sayi1 / sayi2;

            textBox1.Text = sonuc.ToString();

            double sayi3, sayi4, sonuc2;
            sayi3 = Convert.ToDouble(maskedTextBox2.Text);
            sayi4 = Convert.ToDouble(maskedTextBox4.Text);

            sonuc2 = sayi3 / sayi4;
            textBox2.Text = sonuc2.ToString();


            Raporlama.Items.Add("Tarih: " + maskedTextBox1.Text + " - " + "Alınan  Yakıt Tutarı: " + maskedTextBox2.Text + "-" + "Yapılan KM:" + maskedTextBox3.Text + "-" + "Alınan Litre:" + maskedTextBox4.Text);
            Raporlama.Items.Add("KM'de Yakılan Tl : " + textBox1.Text + " - " + "Yakıt Litre Ücreti: " + textBox2.Text);
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
