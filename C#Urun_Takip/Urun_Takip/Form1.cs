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
    public partial class form1 : Form
    {
        public form1()
        {
            InitializeComponent();
        }
        //BAĞLANTISINIFI
        SqlConnection baglanti = new SqlConnection("Data Source=DESKTOP-8ELJ13I\\SQLEXPRESS;Initial Catalog=DBUrun;Integrated Security=True");
        private void btnListele_Click(object sender, EventArgs e)
        {
           
            //KOMUTSINIFI(EKLEME-ÇIKARMA-GÜNCELLEME İŞLEMLERİ EKLENİR)
            SqlCommand komut = new SqlCommand("Select * From TBLKategori", baglanti);
            //KÖPRÜSINIFI
            SqlDataAdapter da = new SqlDataAdapter(komut);
            //VERİTABLOSU
            DataTable dt = new DataTable();
            da.Fill(dt);
            dataGridView1.DataSource = dt;
        }

        private void btnKaydet_Click(object sender, EventArgs e)
        {
            baglanti.Open();
            SqlCommand komut2 = new SqlCommand("insert into TBLKategori (Ad) Values (@p1)",baglanti);
            komut2.Parameters.AddWithValue("@p1", TxtKategoriAd.Text);
            //Sorguyu çalıştıran parametre EXecuteNonQuery
            komut2.ExecuteNonQuery();
            baglanti.Close();
            MessageBox.Show("Kategoriniz başarılı bir şekilde eklendi.");
        }

        private void btnSil_Click(object sender, EventArgs e)
        {
            baglanti.Open();
            SqlCommand komut3 = new SqlCommand("delete from TBLKategori where ID=@p1", baglanti);
            komut3.Parameters.AddWithValue("@p1",txtID.Text);
            komut3.ExecuteNonQuery();
            baglanti.Close();
            MessageBox.Show("Kategoriniz silme işlemi başarılı bir şekilde gerçekleşti.");
        }

        private void btnGuncelle_Click(object sender, EventArgs e)
        {
            baglanti.Open();
            SqlCommand komut4 = new SqlCommand("update TBLKategori set Ad=@p1 where ID=@p2", baglanti);
            komut4.Parameters.AddWithValue("@p1", TxtKategoriAd.Text);
            komut4.Parameters.AddWithValue("@p2", txtID.Text);
            komut4.ExecuteNonQuery();
            baglanti.Close();
            MessageBox.Show("Kategoriniz güncelleme işlemi başarılı");

        }

        private void btnAra_Click(object sender, EventArgs e)
        {
            //KOMUTSINIFI(EKLEME-ÇIKARMA-GÜNCELLEME İŞLEMLERİ EKLENİR)
            SqlCommand komut = new SqlCommand("Select * From TBLKategori Where AD=@p1", baglanti);
            komut.Parameters.AddWithValue("@p1", TxtKategoriAd.Text);
            //KÖPRÜSINIFI
            SqlDataAdapter da = new SqlDataAdapter(komut);
            //VERİTABLOSU
            DataTable dt = new DataTable();
            da.Fill(dt);
            dataGridView1.DataSource = dt;
        }

        private void label3_Click(object sender, EventArgs e)
        {
            FrmYonlendirme yeni = new FrmYonlendirme();
            yeni.Show();
            this.Hide();
        }
    }
}
//Data Source=DESKTOP-8ELJ13I\SQLEXPRESS;Initial Catalog=DBUrun;Integrated Security=True