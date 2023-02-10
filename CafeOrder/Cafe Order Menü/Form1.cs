using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Cafe_Order_Menü
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        int kasa = 0;
        private void BtnHesapla_Click(object sender, EventArgs e)
        {
            int cay, kahve, kek, borek, su, toplam;
            cay = Convert.ToInt16(TxtCay.Text);
            kahve = Convert.ToInt16(TxtKahve.Text);
            kek = Convert.ToInt16(TxtKek.Text);
            borek = Convert.ToInt16(TxtBorek.Text);
            su = Convert.ToInt16(TxtSu.Text);

            toplam = cay * 2 + kahve * 3 + kek * 8 + borek * 10 + su * 1;
            LblToplam.Text = toplam.ToString();

            kasa = kasa + toplam;
            LblKasa.Text = kasa.ToString(); 
        }

        private void BtnTemizle_Click(object sender, EventArgs e)
        {
            TxtCay.Text = "";
            TxtKahve.Text = "";
            TxtKek.Text = "";
            TxtBorek.Text = "";
            TxtSu.Text = "";
            LblToplam.Text = "";
            TxtCay.Focus();
        }
    }
}
