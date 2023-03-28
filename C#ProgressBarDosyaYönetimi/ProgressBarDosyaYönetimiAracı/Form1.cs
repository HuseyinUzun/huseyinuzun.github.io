using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ProgressBarDosyaYönetimiAracı
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            progressBar1.Value += 10;
            if (progressBar1.Value== 100) 
            {
                timer1.Stop();
                timer2.Start();
                label1.Text = ("Dosyalar indirildi.");
            }
        }

        private void timer2_Tick(object sender, EventArgs e)
        {
            progressBar2.Value += 20;
            if (progressBar2.Value== 100)
            {
                timer2.Stop();
                timer3.Start();
                label2.Text = ("Dosyalar çıkarıldı.");
            }
        }

        private void timer3_Tick(object sender, EventArgs e)
        {
            progressBar3.Value += 5;
            if (progressBar3.Value==100)
            {
                timer3.Stop();
                label3.Text = ("Dosyalar yüklendi.");
                MessageBox.Show("Yüklemeniz tamamlandı.");
            }
        }
    }
}
