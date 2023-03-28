namespace FormApp
{
    partial class Form1
    {
        /// <summary>
        ///Gerekli tasarımcı değişkeni.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///Kullanılan tüm kaynakları temizleyin.
        /// </summary>
        ///<param name="disposing">yönetilen kaynaklar dispose edilmeliyse doğru; aksi halde yanlış.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer üretilen kod

        /// <summary>
        /// Tasarımcı desteği için gerekli metot - bu metodun 
        ///içeriğini kod düzenleyici ile değiştirmeyin.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.label1 = new System.Windows.Forms.Label();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.listBox1 = new System.Windows.Forms.ListBox();
            this.button1 = new System.Windows.Forms.Button();
            this.CmbNereden = new System.Windows.Forms.ComboBox();
            this.CmbNereye = new System.Windows.Forms.ComboBox();
            this.MskTarih = new System.Windows.Forms.MaskedTextBox();
            this.MskSaat = new System.Windows.Forms.MaskedTextBox();
            this.MskTcNO = new System.Windows.Forms.MaskedTextBox();
            this.MskTelefon = new System.Windows.Forms.MaskedTextBox();
            this.TxtAdSoyad = new System.Windows.Forms.TextBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.panel1.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.SkyBlue;
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Location = new System.Drawing.Point(28, 29);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(806, 100);
            this.panel1.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe Script", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(162)));
            this.label1.ForeColor = System.Drawing.Color.MidnightBlue;
            this.label1.Location = new System.Drawing.Point(54, 22);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(546, 50);
            this.label1.TabIndex = 0;
            this.label1.Text = "Otobüs Online Bilet Satış Paneli";
            this.label1.Click += new System.EventHandler(this.label1_Click_1);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.MskSaat);
            this.groupBox1.Controls.Add(this.MskTarih);
            this.groupBox1.Controls.Add(this.CmbNereye);
            this.groupBox1.Controls.Add(this.CmbNereden);
            this.groupBox1.Controls.Add(this.label5);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Location = new System.Drawing.Point(91, 147);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(333, 218);
            this.groupBox1.TabIndex = 1;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Kalkış Bilgileri";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.TxtAdSoyad);
            this.groupBox2.Controls.Add(this.MskTelefon);
            this.groupBox2.Controls.Add(this.MskTcNO);
            this.groupBox2.Controls.Add(this.button1);
            this.groupBox2.Controls.Add(this.label8);
            this.groupBox2.Controls.Add(this.label7);
            this.groupBox2.Controls.Add(this.label6);
            this.groupBox2.Location = new System.Drawing.Point(451, 155);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(350, 210);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Yolcu Bilgileri";
            this.groupBox2.Enter += new System.EventHandler(this.groupBox2_Enter);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(20, 61);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(92, 24);
            this.label2.TabIndex = 0;
            this.label2.Text = "Nereden:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(20, 99);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(79, 24);
            this.label3.TabIndex = 1;
            this.label3.Text = "Nereye:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(20, 143);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(64, 24);
            this.label4.TabIndex = 2;
            this.label4.Text = "Tarih:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(20, 186);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(54, 24);
            this.label5.TabIndex = 3;
            this.label5.Text = "Saat:";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(19, 47);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(100, 24);
            this.label6.TabIndex = 4;
            this.label6.Text = "Ad-Soyad:";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(19, 82);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(41, 24);
            this.label7.TabIndex = 5;
            this.label7.Text = "TC:";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(17, 125);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(84, 24);
            this.label8.TabIndex = 6;
            this.label8.Text = "Telefon:";
            // 
            // listBox1
            // 
            this.listBox1.FormattingEnabled = true;
            this.listBox1.ItemHeight = 24;
            this.listBox1.Location = new System.Drawing.Point(115, 378);
            this.listBox1.Name = "listBox1";
            this.listBox1.Size = new System.Drawing.Size(647, 76);
            this.listBox1.TabIndex = 2;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(212, 167);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(100, 45);
            this.button1.TabIndex = 3;
            this.button1.Text = "Kaydet";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // CmbNereden
            // 
            this.CmbNereden.FormattingEnabled = true;
            this.CmbNereden.Items.AddRange(new object[] {
            "Ankara",
            "Çorum",
            "Eskişehir",
            "Aydın",
            "İzmir"});
            this.CmbNereden.Location = new System.Drawing.Point(128, 53);
            this.CmbNereden.Name = "CmbNereden";
            this.CmbNereden.Size = new System.Drawing.Size(152, 32);
            this.CmbNereden.TabIndex = 3;
            // 
            // CmbNereye
            // 
            this.CmbNereye.FormattingEnabled = true;
            this.CmbNereye.Items.AddRange(new object[] {
            "Ankara",
            "Çorum",
            "Eskişehir",
            "Aydın",
            "İzmir"});
            this.CmbNereye.Location = new System.Drawing.Point(128, 91);
            this.CmbNereye.Name = "CmbNereye";
            this.CmbNereye.Size = new System.Drawing.Size(152, 32);
            this.CmbNereye.TabIndex = 4;
            // 
            // MskTarih
            // 
            this.MskTarih.Location = new System.Drawing.Point(128, 137);
            this.MskTarih.Mask = "00/00/0000";
            this.MskTarih.Name = "MskTarih";
            this.MskTarih.Size = new System.Drawing.Size(122, 30);
            this.MskTarih.TabIndex = 5;
            this.MskTarih.ValidatingType = typeof(System.DateTime);
            // 
            // MskSaat
            // 
            this.MskSaat.Location = new System.Drawing.Point(128, 180);
            this.MskSaat.Mask = "00:00";
            this.MskSaat.Name = "MskSaat";
            this.MskSaat.Size = new System.Drawing.Size(67, 30);
            this.MskSaat.TabIndex = 6;
            this.MskSaat.ValidatingType = typeof(System.DateTime);
            // 
            // MskTcNO
            // 
            this.MskTcNO.Location = new System.Drawing.Point(146, 82);
            this.MskTcNO.Mask = "00000000000";
            this.MskTcNO.Name = "MskTcNO";
            this.MskTcNO.Size = new System.Drawing.Size(166, 30);
            this.MskTcNO.TabIndex = 7;
            this.MskTcNO.ValidatingType = typeof(int);
            // 
            // MskTelefon
            // 
            this.MskTelefon.Location = new System.Drawing.Point(146, 125);
            this.MskTelefon.Mask = "(999) 000-0000";
            this.MskTelefon.Name = "MskTelefon";
            this.MskTelefon.Size = new System.Drawing.Size(166, 30);
            this.MskTelefon.TabIndex = 8;
            // 
            // TxtAdSoyad
            // 
            this.TxtAdSoyad.Location = new System.Drawing.Point(146, 44);
            this.TxtAdSoyad.Name = "TxtAdSoyad";
            this.TxtAdSoyad.Size = new System.Drawing.Size(166, 30);
            this.TxtAdSoyad.TabIndex = 9;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::FormApp.Properties.Resources.PaleGloomyArctichare_max_1mb1;
            this.pictureBox1.Location = new System.Drawing.Point(646, 12);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(143, 74);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            this.pictureBox1.Click += new System.EventHandler(this.pictureBox1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 24F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.ClientSize = new System.Drawing.Size(866, 466);
            this.Controls.Add(this.listBox1);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.panel1);
            this.Font = new System.Drawing.Font("Georgia", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(162)));
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.MaskedTextBox MskSaat;
        private System.Windows.Forms.MaskedTextBox MskTarih;
        private System.Windows.Forms.ComboBox CmbNereye;
        private System.Windows.Forms.ComboBox CmbNereden;
        private System.Windows.Forms.TextBox TxtAdSoyad;
        private System.Windows.Forms.MaskedTextBox MskTelefon;
        private System.Windows.Forms.MaskedTextBox MskTcNO;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.ListBox listBox1;
    }
}

