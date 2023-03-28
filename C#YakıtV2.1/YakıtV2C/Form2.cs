using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Eventing.Reader;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MetroFramework;

namespace YakıtV2C
{
    public partial class Form2 : MetroFramework.Forms.MetroForm
    {
        public Form2()
        {
            InitializeComponent();
        }
        int hak = 3;
        private void metroButton1_Click(object sender, EventArgs e)
        {
          
            if (metroTextBox1.Text == "admin" && metroTextBox2.Text == "1234")
            {
                Form1 yeni = new Form1();
                yeni.Show();
                this.Hide();
            }
            else
            {
                if (metroTextBox1.Text == "" || metroTextBox2.Text == "")
                {
                    MessageBox.Show("Kullanıcı adı ve/veya şifre boş geçilemez.", "Uyarı");
                }

                else
                {
                    hak--;
                    MessageBox.Show("Kullanıcı adı ve/veya şifre yanlış.Kalan hakkınız :" +hak, "Uyarı");
                   
                    if (hak==0)
                    {
                        Application.Exit();
                    }
                }
               
            }
            
        }

        private void metroTextBox1_Click(object sender, EventArgs e)
        {
            metroTextBox1.Text = "";
        }

        private void metroTextBox2_Click(object sender, EventArgs e)
        {
            metroTextBox2.Text = "";
        }
    }
}
