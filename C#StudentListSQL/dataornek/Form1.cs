using System.Data.SqlClient;

namespace dataornek
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }


        SqlConnection baglanti = null;
        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                baglanti = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=dbOrnek;Integrated Security=True");
                baglanti.Open();

                SqlCommand sqlKomut = new SqlCommand("SELECT OgrenciID,OgrenciAdi,Not1,Not2 FROM TableOgrenci" , baglanti);
                SqlDataReader sqlDR = sqlKomut.ExecuteReader();

                while (sqlDR.Read())

                {

                    string id = sqlDR[0].ToString();
                    string ogrenciAdi = sqlDR[1].ToString();
                    string not1 = sqlDR[2].ToString();
                    string not2 = sqlDR[3].ToString();

                    richTextBox1.Text = richTextBox1.Text + id + " " +"Öðrenci Adý :" + ogrenciAdi  +" "+ "Not1:" + not1+ " " + "Not2:" + not2+ "\n";

                }
            }
            catch (Exception ex)
            {

                MessageBox.Show("HATA" + ex.ToString());
            }
            finally
            {
                if (baglanti != null)
                    baglanti.Close();
            }
        }
    }
}