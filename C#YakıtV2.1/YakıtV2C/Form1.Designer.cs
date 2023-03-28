namespace YakıtV2C
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
            this.metroLabel5 = new MetroFramework.Controls.MetroLabel();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.Raporlama = new System.Windows.Forms.ListBox();
            this.textBox1 = new MetroFramework.Controls.MetroTextBox();
            this.metroLabel6 = new MetroFramework.Controls.MetroLabel();
            this.textBox2 = new MetroFramework.Controls.MetroTextBox();
            this.metroLabel7 = new MetroFramework.Controls.MetroLabel();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.metroRadioButton3 = new MetroFramework.Controls.MetroRadioButton();
            this.metroRadioButton2 = new MetroFramework.Controls.MetroRadioButton();
            this.metroRadioButton1 = new MetroFramework.Controls.MetroRadioButton();
            this.metroButton1 = new MetroFramework.Controls.MetroButton();
            this.metroLabel4 = new MetroFramework.Controls.MetroLabel();
            this.b4 = new MetroFramework.Controls.MetroTextBox();
            this.metroLabel3 = new MetroFramework.Controls.MetroLabel();
            this.b3 = new MetroFramework.Controls.MetroTextBox();
            this.DateTime = new MetroFramework.Controls.MetroDateTime();
            this.metroLabel2 = new MetroFramework.Controls.MetroLabel();
            this.metroLabel1 = new MetroFramework.Controls.MetroLabel();
            this.b1 = new MetroFramework.Controls.MetroTextBox();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // metroLabel5
            // 
            this.metroLabel5.AutoSize = true;
            this.metroLabel5.Location = new System.Drawing.Point(547, 31);
            this.metroLabel5.Name = "metroLabel5";
            this.metroLabel5.Size = new System.Drawing.Size(102, 20);
            this.metroLabel5.TabIndex = 23;
            this.metroLabel5.Text = "HU|SOFTWARE";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.Raporlama);
            this.groupBox2.Controls.Add(this.textBox1);
            this.groupBox2.Controls.Add(this.metroLabel6);
            this.groupBox2.Controls.Add(this.textBox2);
            this.groupBox2.Controls.Add(this.metroLabel7);
            this.groupBox2.Font = new System.Drawing.Font("Calibri", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(162)));
            this.groupBox2.Location = new System.Drawing.Point(26, 233);
            this.groupBox2.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox2.Size = new System.Drawing.Size(623, 210);
            this.groupBox2.TabIndex = 22;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "LPG|BENZİN|DİZEL";
            // 
            // Raporlama
            // 
            this.Raporlama.FormattingEnabled = true;
            this.Raporlama.ItemHeight = 21;
            this.Raporlama.Location = new System.Drawing.Point(16, 81);
            this.Raporlama.Name = "Raporlama";
            this.Raporlama.Size = new System.Drawing.Size(591, 109);
            this.Raporlama.TabIndex = 14;
            // 
            // textBox1
            // 
            // 
            // 
            // 
            this.textBox1.CustomButton.Image = null;
            this.textBox1.CustomButton.Location = new System.Drawing.Point(130, 1);
            this.textBox1.CustomButton.Name = "";
            this.textBox1.CustomButton.Size = new System.Drawing.Size(25, 25);
            this.textBox1.CustomButton.Style = MetroFramework.MetroColorStyle.Blue;
            this.textBox1.CustomButton.TabIndex = 1;
            this.textBox1.CustomButton.Theme = MetroFramework.MetroThemeStyle.Light;
            this.textBox1.CustomButton.UseSelectable = true;
            this.textBox1.CustomButton.Visible = false;
            this.textBox1.Lines = new string[] {
        "TL"};
            this.textBox1.Location = new System.Drawing.Point(147, 38);
            this.textBox1.MaxLength = 32767;
            this.textBox1.Name = "textBox1";
            this.textBox1.PasswordChar = '\0';
            this.textBox1.ScrollBars = System.Windows.Forms.ScrollBars.None;
            this.textBox1.SelectedText = "";
            this.textBox1.SelectionLength = 0;
            this.textBox1.SelectionStart = 0;
            this.textBox1.ShortcutsEnabled = true;
            this.textBox1.Size = new System.Drawing.Size(156, 27);
            this.textBox1.TabIndex = 7;
            this.textBox1.Text = "TL";
            this.textBox1.UseSelectable = true;
            this.textBox1.WaterMarkColor = System.Drawing.Color.FromArgb(((int)(((byte)(109)))), ((int)(((byte)(109)))), ((int)(((byte)(109)))));
            this.textBox1.WaterMarkFont = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Pixel);
            // 
            // metroLabel6
            // 
            this.metroLabel6.AutoSize = true;
            this.metroLabel6.Location = new System.Drawing.Point(323, 38);
            this.metroLabel6.Name = "metroLabel6";
            this.metroLabel6.Size = new System.Drawing.Size(111, 20);
            this.metroLabel6.TabIndex = 6;
            this.metroLabel6.Text = "Yakıt Litre Tutarı :";
            // 
            // textBox2
            // 
            // 
            // 
            // 
            this.textBox2.CustomButton.Image = null;
            this.textBox2.CustomButton.Location = new System.Drawing.Point(130, 1);
            this.textBox2.CustomButton.Name = "";
            this.textBox2.CustomButton.Size = new System.Drawing.Size(25, 25);
            this.textBox2.CustomButton.Style = MetroFramework.MetroColorStyle.Blue;
            this.textBox2.CustomButton.TabIndex = 1;
            this.textBox2.CustomButton.Theme = MetroFramework.MetroThemeStyle.Light;
            this.textBox2.CustomButton.UseSelectable = true;
            this.textBox2.CustomButton.Visible = false;
            this.textBox2.Lines = new string[] {
        "LİTRE"};
            this.textBox2.Location = new System.Drawing.Point(451, 38);
            this.textBox2.MaxLength = 32767;
            this.textBox2.Name = "textBox2";
            this.textBox2.PasswordChar = '\0';
            this.textBox2.ScrollBars = System.Windows.Forms.ScrollBars.None;
            this.textBox2.SelectedText = "";
            this.textBox2.SelectionLength = 0;
            this.textBox2.SelectionStart = 0;
            this.textBox2.ShortcutsEnabled = true;
            this.textBox2.Size = new System.Drawing.Size(156, 27);
            this.textBox2.TabIndex = 5;
            this.textBox2.Text = "LİTRE";
            this.textBox2.UseSelectable = true;
            this.textBox2.WaterMarkColor = System.Drawing.Color.FromArgb(((int)(((byte)(109)))), ((int)(((byte)(109)))), ((int)(((byte)(109)))));
            this.textBox2.WaterMarkFont = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Pixel);
            // 
            // metroLabel7
            // 
            this.metroLabel7.AutoSize = true;
            this.metroLabel7.Location = new System.Drawing.Point(21, 38);
            this.metroLabel7.Name = "metroLabel7";
            this.metroLabel7.Size = new System.Drawing.Size(120, 20);
            this.metroLabel7.TabIndex = 3;
            this.metroLabel7.Text = "KM\'de yakılan TL :";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.metroRadioButton3);
            this.groupBox1.Controls.Add(this.metroRadioButton2);
            this.groupBox1.Controls.Add(this.metroRadioButton1);
            this.groupBox1.Controls.Add(this.metroButton1);
            this.groupBox1.Controls.Add(this.metroLabel4);
            this.groupBox1.Controls.Add(this.b4);
            this.groupBox1.Controls.Add(this.metroLabel3);
            this.groupBox1.Controls.Add(this.b3);
            this.groupBox1.Controls.Add(this.DateTime);
            this.groupBox1.Controls.Add(this.metroLabel2);
            this.groupBox1.Controls.Add(this.metroLabel1);
            this.groupBox1.Controls.Add(this.b1);
            this.groupBox1.Font = new System.Drawing.Font("Calibri", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(162)));
            this.groupBox1.Location = new System.Drawing.Point(26, 62);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(4);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(4);
            this.groupBox1.Size = new System.Drawing.Size(623, 157);
            this.groupBox1.TabIndex = 21;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "LPG|BENZİN|DİZEL";
            // 
            // metroRadioButton3
            // 
            this.metroRadioButton3.AutoSize = true;
            this.metroRadioButton3.Location = new System.Drawing.Point(193, 125);
            this.metroRadioButton3.Name = "metroRadioButton3";
            this.metroRadioButton3.Size = new System.Drawing.Size(52, 17);
            this.metroRadioButton3.TabIndex = 12;
            this.metroRadioButton3.Text = "Dizel";
            this.metroRadioButton3.UseSelectable = true;
            // 
            // metroRadioButton2
            // 
            this.metroRadioButton2.AutoSize = true;
            this.metroRadioButton2.Location = new System.Drawing.Point(101, 125);
            this.metroRadioButton2.Name = "metroRadioButton2";
            this.metroRadioButton2.Size = new System.Drawing.Size(61, 17);
            this.metroRadioButton2.TabIndex = 11;
            this.metroRadioButton2.Text = "Benzin";
            this.metroRadioButton2.UseSelectable = true;
            // 
            // metroRadioButton1
            // 
            this.metroRadioButton1.AutoSize = true;
            this.metroRadioButton1.Location = new System.Drawing.Point(21, 125);
            this.metroRadioButton1.Name = "metroRadioButton1";
            this.metroRadioButton1.Size = new System.Drawing.Size(46, 17);
            this.metroRadioButton1.TabIndex = 10;
            this.metroRadioButton1.Text = "LPG";
            this.metroRadioButton1.UseSelectable = true;
            // 
            // metroButton1
            // 
            this.metroButton1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(64)))));
            this.metroButton1.Location = new System.Drawing.Point(451, 117);
            this.metroButton1.Name = "metroButton1";
            this.metroButton1.Size = new System.Drawing.Size(156, 25);
            this.metroButton1.TabIndex = 9;
            this.metroButton1.Text = "Hesapla";
            this.metroButton1.UseSelectable = true;
            this.metroButton1.Click += new System.EventHandler(this.metroButton1_Click_1);
            // 
            // metroLabel4
            // 
            this.metroLabel4.AutoSize = true;
            this.metroLabel4.Location = new System.Drawing.Point(323, 77);
            this.metroLabel4.Name = "metroLabel4";
            this.metroLabel4.Size = new System.Drawing.Size(125, 20);
            this.metroLabel4.TabIndex = 8;
            this.metroLabel4.Text = "Alınan Yakıt Litresi :";
            // 
            // b4
            // 
            // 
            // 
            // 
            this.b4.CustomButton.Image = null;
            this.b4.CustomButton.Location = new System.Drawing.Point(130, 1);
            this.b4.CustomButton.Name = "";
            this.b4.CustomButton.Size = new System.Drawing.Size(25, 25);
            this.b4.CustomButton.Style = MetroFramework.MetroColorStyle.Blue;
            this.b4.CustomButton.TabIndex = 1;
            this.b4.CustomButton.Theme = MetroFramework.MetroThemeStyle.Light;
            this.b4.CustomButton.UseSelectable = true;
            this.b4.CustomButton.Visible = false;
            this.b4.Lines = new string[0];
            this.b4.Location = new System.Drawing.Point(451, 77);
            this.b4.MaxLength = 32767;
            this.b4.Name = "b4";
            this.b4.PasswordChar = '\0';
            this.b4.ScrollBars = System.Windows.Forms.ScrollBars.None;
            this.b4.SelectedText = "";
            this.b4.SelectionLength = 0;
            this.b4.SelectionStart = 0;
            this.b4.ShortcutsEnabled = true;
            this.b4.Size = new System.Drawing.Size(156, 27);
            this.b4.TabIndex = 7;
            this.b4.UseSelectable = true;
            this.b4.WaterMarkColor = System.Drawing.Color.FromArgb(((int)(((byte)(109)))), ((int)(((byte)(109)))), ((int)(((byte)(109)))));
            this.b4.WaterMarkFont = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Pixel);
            // 
            // metroLabel3
            // 
            this.metroLabel3.AutoSize = true;
            this.metroLabel3.Location = new System.Drawing.Point(323, 38);
            this.metroLabel3.Name = "metroLabel3";
            this.metroLabel3.Size = new System.Drawing.Size(82, 20);
            this.metroLabel3.TabIndex = 6;
            this.metroLabel3.Text = "Yapılan KM :";
            // 
            // b3
            // 
            // 
            // 
            // 
            this.b3.CustomButton.Image = null;
            this.b3.CustomButton.Location = new System.Drawing.Point(130, 1);
            this.b3.CustomButton.Name = "";
            this.b3.CustomButton.Size = new System.Drawing.Size(25, 25);
            this.b3.CustomButton.Style = MetroFramework.MetroColorStyle.Blue;
            this.b3.CustomButton.TabIndex = 1;
            this.b3.CustomButton.Theme = MetroFramework.MetroThemeStyle.Light;
            this.b3.CustomButton.UseSelectable = true;
            this.b3.CustomButton.Visible = false;
            this.b3.Lines = new string[0];
            this.b3.Location = new System.Drawing.Point(451, 38);
            this.b3.MaxLength = 32767;
            this.b3.Name = "b3";
            this.b3.PasswordChar = '\0';
            this.b3.ScrollBars = System.Windows.Forms.ScrollBars.None;
            this.b3.SelectedText = "";
            this.b3.SelectionLength = 0;
            this.b3.SelectionStart = 0;
            this.b3.ShortcutsEnabled = true;
            this.b3.Size = new System.Drawing.Size(156, 27);
            this.b3.TabIndex = 5;
            this.b3.UseSelectable = true;
            this.b3.WaterMarkColor = System.Drawing.Color.FromArgb(((int)(((byte)(109)))), ((int)(((byte)(109)))), ((int)(((byte)(109)))));
            this.b3.WaterMarkFont = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Pixel);
            // 
            // DateTime
            // 
            this.DateTime.Location = new System.Drawing.Point(149, 38);
            this.DateTime.MinimumSize = new System.Drawing.Size(0, 30);
            this.DateTime.Name = "DateTime";
            this.DateTime.Size = new System.Drawing.Size(156, 30);
            this.DateTime.TabIndex = 4;
            // 
            // metroLabel2
            // 
            this.metroLabel2.AutoSize = true;
            this.metroLabel2.Location = new System.Drawing.Point(21, 38);
            this.metroLabel2.Name = "metroLabel2";
            this.metroLabel2.Size = new System.Drawing.Size(87, 20);
            this.metroLabel2.TabIndex = 3;
            this.metroLabel2.Text = "Alınan Tarih :";
            // 
            // metroLabel1
            // 
            this.metroLabel1.AutoSize = true;
            this.metroLabel1.Location = new System.Drawing.Point(21, 77);
            this.metroLabel1.Name = "metroLabel1";
            this.metroLabel1.Size = new System.Drawing.Size(122, 20);
            this.metroLabel1.TabIndex = 1;
            this.metroLabel1.Text = "Alınan Yakıt Tutarı :";
            // 
            // b1
            // 
            // 
            // 
            // 
            this.b1.CustomButton.Image = null;
            this.b1.CustomButton.Location = new System.Drawing.Point(130, 1);
            this.b1.CustomButton.Name = "";
            this.b1.CustomButton.Size = new System.Drawing.Size(25, 25);
            this.b1.CustomButton.Style = MetroFramework.MetroColorStyle.Blue;
            this.b1.CustomButton.TabIndex = 1;
            this.b1.CustomButton.Theme = MetroFramework.MetroThemeStyle.Light;
            this.b1.CustomButton.UseSelectable = true;
            this.b1.CustomButton.Visible = false;
            this.b1.Lines = new string[0];
            this.b1.Location = new System.Drawing.Point(149, 77);
            this.b1.MaxLength = 32767;
            this.b1.Name = "b1";
            this.b1.PasswordChar = '\0';
            this.b1.ScrollBars = System.Windows.Forms.ScrollBars.None;
            this.b1.SelectedText = "";
            this.b1.SelectionLength = 0;
            this.b1.SelectionStart = 0;
            this.b1.ShortcutsEnabled = true;
            this.b1.Size = new System.Drawing.Size(156, 27);
            this.b1.TabIndex = 0;
            this.b1.UseSelectable = true;
            this.b1.WaterMarkColor = System.Drawing.Color.FromArgb(((int)(((byte)(109)))), ((int)(((byte)(109)))), ((int)(((byte)(109)))));
            this.b1.WaterMarkFont = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Pixel);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(11F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::YakıtV2C.Properties.Resources.yakıt4;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.BackImage = global::YakıtV2C.Properties.Resources.yakıt4;
            this.ClientSize = new System.Drawing.Size(674, 463);
            this.Controls.Add(this.metroLabel5);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(162)));
            this.Margin = new System.Windows.Forms.Padding(4);
            this.Name = "Form1";
            this.Padding = new System.Windows.Forms.Padding(28, 75, 28, 25);
            this.Text = "Yakıt Tüketim ";
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private MetroFramework.Controls.MetroLabel metroLabel5;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.ListBox Raporlama;
        private MetroFramework.Controls.MetroTextBox textBox1;
        private MetroFramework.Controls.MetroLabel metroLabel6;
        private MetroFramework.Controls.MetroTextBox textBox2;
        private MetroFramework.Controls.MetroLabel metroLabel7;
        private System.Windows.Forms.GroupBox groupBox1;
        private MetroFramework.Controls.MetroRadioButton metroRadioButton3;
        private MetroFramework.Controls.MetroRadioButton metroRadioButton2;
        private MetroFramework.Controls.MetroRadioButton metroRadioButton1;
        private MetroFramework.Controls.MetroButton metroButton1;
        private MetroFramework.Controls.MetroLabel metroLabel4;
        private MetroFramework.Controls.MetroTextBox b4;
        private MetroFramework.Controls.MetroLabel metroLabel3;
        private MetroFramework.Controls.MetroTextBox b3;
        private MetroFramework.Controls.MetroDateTime DateTime;
        private MetroFramework.Controls.MetroLabel metroLabel2;
        private MetroFramework.Controls.MetroLabel metroLabel1;
        private MetroFramework.Controls.MetroTextBox b1;
    }
}

