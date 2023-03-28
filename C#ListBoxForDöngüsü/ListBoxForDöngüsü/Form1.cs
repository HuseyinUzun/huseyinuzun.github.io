using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ListBoxForDöngüsü
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }


        private void button1_Click(object sender, EventArgs e)
        {
            /*bu proje ile textboxa girilen sayının,2 ile bölümünden kalanı 0 olan yani
       çift sayıları list boxa yazdırmssını sağladık*/
            //listBox1.Items.Clear();
            //int sayi = Convert.ToInt32(textBox1.Text);


            /*Faktöriyel Hesaplama Programı*/

            listBox1.Items.Clear();
            int sonuc = 1;
            int sayi = Convert.ToInt32(textBox1.Text);

            for (int i = 1; i <= sayi; i++)
            {
                sonuc = sonuc * i;
                listBox1.Items.Add(sonuc);
            }

        }

        private void button2_Click(object sender, EventArgs e)
        {
            listBox1.Items.Clear();
            int sayi = Convert.ToInt32(textBox1.Text);
            for (int i = 1; i <= sayi; i++)
            {
                if (i % 2 == 0)
                {
                    listBox1.Items.Add(i);
                }

            }
        }
    }
}
