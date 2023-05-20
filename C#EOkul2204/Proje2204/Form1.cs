using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Entity;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MetroFramework;

namespace Proje2204
{
    public partial class Form1 : MetroFramework.Forms.MetroForm
    {
        Customer model = new Customer();
        public Form1()
        {
            InitializeComponent();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            Clear();
        }
        void Clear()
        {
            txtFrstName.Text = txtLastname.Text = txtMail.Text = txtAdress.Text = "";
            btnSave.Text = "Save";
            btnDelete.Enabled = false;
            model.CustomerID = 0;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Clear();
            PopulateDataGridView();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            model.FirstName=  txtFrstName.Text.Trim();
            model.LastName = txtLastname.Text.Trim();
            model.Email = txtMail.Text.Trim();
            model.Address = txtAdress.Text.Trim();

            using (EFDBEntities2 db = new EFDBEntities2()) 
            {
                if(model.CustomerID == 0)
                db.Customer.Add(model);
                else
                    db.Entry(model).State=EntityState.Modified;
                db.SaveChanges();
            }
            Clear();
            PopulateDataGridView();
            MessageBox.Show("Başarıyla Kaydedildi");
        }

        void PopulateDataGridView()
        {
            using (EFDBEntities2 db = new EFDBEntities2())
            {
                dataGridView1.AutoGenerateColumns = false;
                dataGridView1.DataSource = db.Customer.ToList<Customer>();
            } 
        }

        private void dataGridView1_DoubleClick(object sender, EventArgs e)
        {
            if(dataGridView1.CurrentRow.Index != -1)
            {
                model.CustomerID = Convert.ToInt32(dataGridView1.CurrentRow.Cells["CustomerID"].Value);
                using(EFDBEntities2 db = new EFDBEntities2())
                {
                    model = db.Customer.Where(x => x.CustomerID == model.CustomerID).FirstOrDefault();  
                    txtFrstName.Text = model.FirstName;
                    txtLastname.Text = model.LastName;
                    txtMail.Text = model.Email;
                    txtAdress.Text = model.Address;
                }
                btnSave.Text = "Update";
                btnDelete.Enabled = true;
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if(MessageBox.Show("Silmek istediğinizden emin misiniz?","Silmek için izin",MessageBoxButtons.YesNo)==DialogResult.Yes) 
            using(EFDBEntities2 db = new EFDBEntities2())
            {
                    var entry = db.Entry(model);
                    //if (entry.State == EntityState.Detached)
                    //    db.Customer.Remove(model);
                    //db.SaveChanges();
                    //PopulateDataGridView();
                    //Clear();
                    //MessageBox.Show("Başarıyla Silindi.");
                    if (MessageBox.Show("Silmek istediğinizden emin misiniz?", "Silmek için izin", MessageBoxButtons.YesNo) == DialogResult.Yes)
                    {
                       
                        {
                            var existingModel = db.Customer.Find(model.CustomerID);
                            if (existingModel != null)
                            {
                                db.Customer.Remove(existingModel);
                                db.SaveChanges();
                                PopulateDataGridView();
                                Clear();
                                MessageBox.Show("Başarıyla Silindi.");
                            }
                            else
                            {
                                MessageBox.Show("Silmek istediğiniz öğe zaten silinmiş veya var olmamış.");
                            }
                        }
                    }
                }
        }
    }
}
