using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace Urun_Takip
{

    public partial class frmIstatıstık : Form
    {
        public frmIstatıstık()
        {
            InitializeComponent();
        }

        SqlConnection baglanti = new SqlConnection("Data Source=DESKTOP-8ELJ13I\\SQLEXPRESS;Initial Catalog=DBUrun;Integrated Security=True");
        private void Frmİstatistik_Load(object sender, EventArgs e)
        {
            //Toplam Kategori Sayısı
            baglanti.Open();
            SqlCommand komut = new SqlCommand("Select Count(*) From TBLKategori", baglanti);
            SqlDataReader dr = komut.ExecuteReader();
            while (dr.Read())
            {
                lblToplamKategori.Text = dr[0].ToString();
            }
            baglanti.Close();

            //Toplam Ürün Sayısı
            baglanti.Open();
            SqlCommand komut2 = new SqlCommand("Select Count(*) From TBLUrunler", baglanti);
            SqlDataReader dr2 = komut2.ExecuteReader();
            while (dr2.Read())
            {
                lblToplamUrunSayısı.Text = dr2[0].ToString();
            }
            baglanti.Close();

            //En yüksek Stoklu Ürün Sayısı
            baglanti.Open();
            SqlCommand komut5 = new SqlCommand("Select * From TBLUrunler where Stok=(Select Max(Stok) From TBLUrunler)", baglanti);
            SqlDataReader dr5 = komut5.ExecuteReader();
            while (dr5.Read())
            {
                label5.Text = dr5["UrunAd"].ToString();
            }
            baglanti.Close();

            //En düşük Stoklu Ürün Sayısı
            baglanti.Open();
            SqlCommand komut6 = new SqlCommand("Select * From TBLUrunler where Stok=(Select min(Stok) From TBLUrunler)", baglanti);
            SqlDataReader dr6 = komut6.ExecuteReader();
            while (dr6.Read())
            {
                label7.Text = dr6["UrunAd"].ToString();
            }
            baglanti.Close();

            //Toplam Beyaz Eşya Sayısı
            baglanti.Open();
            SqlCommand komut3 = new SqlCommand("Select Count(*) from TBLUrunler where Kategori=(select ID From TBLKategori where Ad = 'Beyaz Eşya')", baglanti);
            SqlDataReader dr3 = komut3.ExecuteReader();
            while (dr3.Read())
            {
                label11.Text = dr3[0].ToString();
            }
            baglanti.Close();

            //Toplam Küçük Ev Aletleri Sayısı
            baglanti.Open();
            SqlCommand komut4 = new SqlCommand("Select Count(*) from TBLUrunler where Kategori=(select ID From TBLKategori where Ad = 'Küçük Ev Aletleri')", baglanti);
            SqlDataReader dr4 = komut4.ExecuteReader();
            while (dr4.Read())
            {
                label13.Text = dr4[0].ToString();
            }
            baglanti.Close();


            //Laptop Toplam Kar Oranı
            baglanti.Open();
            SqlCommand komut7 = new SqlCommand("select Stok*(Satısfiyat-AlısFiyat) From TBLUrunler where UrunAd='Laptop'", baglanti);
            SqlDataReader dr7 = komut7.ExecuteReader();
            while (dr7.Read())
            {
                label9.Text = dr7[0].ToString() + " ₺ ";
            }
            baglanti.Close();
           
        }

        private void label3_Click(object sender, EventArgs e)
        {
            FrmYonlendirme yeni = new FrmYonlendirme();
            yeni.Show();
            this.Hide();
        }

        private void label11_Click(object sender, EventArgs e)
        {
           
        }
    }
}
