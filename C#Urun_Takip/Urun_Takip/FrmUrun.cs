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
    public partial class FrmUrun : Form
    {
        public FrmUrun()
        {
            InitializeComponent();
        }

        //BAĞLANTISINIFI
        SqlConnection baglanti = new SqlConnection("Data Source=DESKTOP-8ELJ13I\\SQLEXPRESS;Initial Catalog=DBUrun;Integrated Security=True");
        private void btnListele_Click(object sender, EventArgs e)
        {
            //KOMUTSINIFI(EKLEME-ÇIKARMA-GÜNCELLEME İŞLEMLERİ EKLENİR)
            SqlCommand komut = new SqlCommand("Select * From TBLUrunler", baglanti);
            //KÖPRÜSINIFI
            SqlDataAdapter da = new SqlDataAdapter(komut);
            //VERİTABLOSU
            DataTable dt = new DataTable();
            da.Fill(dt);
            dataGridView1.DataSource = dt;
        }

        private void FrmUrun_Load(object sender, EventArgs e)
        {
            baglanti.Open();
            SqlCommand komut2 = new SqlCommand("Select * From TBLKategori", baglanti);
            SqlDataAdapter da2 = new SqlDataAdapter(komut2);
            DataTable dt2 = new DataTable();
            da2.Fill(dt2);
            cbxKategori.DisplayMember = "Ad";
            cbxKategori.ValueMember = "ID";
            cbxKategori.DataSource = dt2;
            baglanti.Close();


        }
        //ürün ekleme
        private void btnKaydet_Click(object sender, EventArgs e)
        {
            baglanti.Open();
            SqlCommand komut3 = new SqlCommand("insert into TBLUrunler(UrunAd,Stok,AlısFiyat,SatısFiyat,Kategori) values (@p1,@p2,@p3,@p4,@p5)", baglanti);
            komut3.Parameters.AddWithValue("@p1", txtAd.Text);
            komut3.Parameters.AddWithValue("@p2", nudStok.Value);
            komut3.Parameters.AddWithValue("@p3", decimal.Parse(txtAlisFiyat.Text));
            komut3.Parameters.AddWithValue("@p4", decimal.Parse(txtSatıs.Text));
            komut3.Parameters.AddWithValue("@p5", cbxKategori.SelectedValue);
            komut3.ExecuteNonQuery();
            baglanti.Close();
            MessageBox.Show("Ürün kaydı başarılı bir şekilde gerçekleşti.");

        }

        private void btnSil_Click(object sender, EventArgs e)
        {
            baglanti.Open();
            SqlCommand komut4 = new SqlCommand("delete from TBLUrunler where UrunId=@p1", baglanti);
            komut4.Parameters.AddWithValue("@p1", txtID.Text);
            komut4.ExecuteNonQuery();
            baglanti.Close();
            MessageBox.Show("Ürün silme başarılı bir şekilde gerçekleşti.");

        }

        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            txtID.Text = dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
            txtAd.Text = dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
            nudStok.Value = int.Parse(dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString());
            txtAlisFiyat.Text = dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
            txtSatıs.Text = dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
            cbxKategori.SelectedValue = dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();


        }

        private void btnGuncelle_Click(object sender, EventArgs e)
        {
            baglanti.Open();
            SqlCommand komut5 = new SqlCommand("update TBLUrunler set UrunAd=@p1,Stok=@p2,AlısFiyat=@p3,SatısFiyat=@p4,Kategori=@p5 where UrunId=@p6", baglanti);
            komut5.Parameters.AddWithValue("@p1", txtAd.Text);
            komut5.Parameters.AddWithValue("@p2", nudStok.Value);
            komut5.Parameters.AddWithValue("@p3", decimal.Parse(txtAlisFiyat.Text));
            komut5.Parameters.AddWithValue("@p4", decimal.Parse(txtSatıs.Text));
            komut5.Parameters.AddWithValue("@p5", cbxKategori.SelectedValue);
            komut5.Parameters.AddWithValue("@p6", txtID.Text);
            komut5.ExecuteNonQuery();
            baglanti.Close();
            MessageBox.Show("Ürün güncelleme başarılı bir şekilde gerçekleşti.","Güncelleme",MessageBoxButtons.OK,MessageBoxIcon.Warning);
        }

        private void label6_Click(object sender, EventArgs e)
        {
            form1 yeni = new form1();
            yeni.Show();
            this.Hide();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            FrmYonlendirme yeni = new FrmYonlendirme();
            yeni.Show();
            this.Hide();
        }
    }
}
