using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FormApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click_1(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void label9_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            listBox1.Items.Add("Rota: " + CmbNereden.Text + " - " + CmbNereye.Text +"//" + "Tarih: " + MskTarih.Text+"//"+ "Saat:" +MskSaat.Text);
            listBox1.Items.Add("Adınız: "+TxtAdSoyad.Text+" - "+"T.C Kimlik No :" +MskTcNO.Text+"-"+"Telefon:"+MskTelefon.Text);
        }

        private void groupBox2_Enter(object sender, EventArgs e)
        {

        }
    }
}
