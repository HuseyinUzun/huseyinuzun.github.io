using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Urun_Takip
{
    public partial class FrmYonlendirme : Form
    {
        public FrmYonlendirme()
        {
            InitializeComponent();
        }

        private void label4_Click(object sender, EventArgs e)
        {
            FrmUrun yeni = new FrmUrun();
            yeni.Show();
            this.Hide();
        }

        private void label1_Click(object sender, EventArgs e)
        {
            form1 yeni = new form1();
            yeni.Show();
            this.Hide();
        }

        private void label2_Click(object sender, EventArgs e)
        {
            FrmYonlendirme yeni = new FrmYonlendirme();
            yeni.Show();
            this.Hide();
        }

        private void label3_Click(object sender, EventArgs e)
        {
            FrmLogin yeni = new FrmLogin();
            yeni.Show();
            this.Hide();
        }

        private void label5_Click(object sender, EventArgs e)
        {
            frmIstatıstık yeni = new frmIstatıstık();
            yeni.Show();
            this.Hide();
        }
    }
}
