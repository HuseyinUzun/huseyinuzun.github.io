// !kayıt bölümü
$(".myBtnKayıt").click(function (event) {
  event.preventDefault();
  let kayıtAd = $(".kayitAd").val();
  let sifre1 = $(".kayitSifre").val();
  let sifre2 = $(".kayitSifre2").val();

  try {
    if (sifre1 == sifre2) {
      localStorage.setItem("girisAdı", kayıtAd);
      localStorage.setItem("sifre", sifre1);
      $(".alert-success").slideDown()
        .html(`<div class="display:block" style="font-size:13px">Kayıt işleminiz başarıyla tamamlanmıştır ${kayıtAd}.</div>
     <div class="display:block" style="font-size:13px"> Giriş Sayfasına Yönlendiriliyorsunuz </div>`);
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000);
    } else {
      $(".alert-danger").slideDown();
    }
  } catch (err) {
    console.log(err);
  }
});

// !giriş bölümü
$(".myBtn").click(function (e) {
  e.preventDefault();
  let girisAdı = $(".inpAd").val();
  let girisSifre = $(".inpSifre").val();
  if (
    girisAdı == localStorage.getItem("girisAdı") &&
    girisSifre == localStorage.getItem("sifre")
  ) {
    window.location.href = "islemler.html";
  } else {
    $(".alert-danger").slideDown();
  }
});

//!Şifremi Unuttum bölümü
$(".myBtnSifreYeni").click(function (e) {
  e.preventDefault();
  let sifreUnuttumAd = $(".sifreUnutmaAd").val();
  let sifreUnutmaSifre = $(".sifreUnutmaSifre").val();
  let sifreUnutmaYeni = $(".sifreUnutmaYeni").val();
  if (
    sifreUnuttumAd == localStorage.getItem("girisAdı") &&
    sifreUnutmaSifre == localStorage.getItem("sifre")
  ) {
    localStorage.setItem("sifre", sifreUnutmaYeni);
    $("#alertsifreUnuttumBasarili").show();
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } else {
    $("#alertsifreUnuttumHatali").show();
  }
});

//!auit location
$(".quit").click(function (e) {
  e.preventDefault();
  window.location.href = "index.html";
});

//!tl çevirme
function turkLirası() {
  let formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });
  let result = formatter.format(bakiye);
  $(".bakiye").html("Bakiyeniz:" + result);
}

//!bakiye
if (!localStorage.getItem("bakiye")) {
  localStorage.setItem("bakiye", 0);
}
let bakiye = Number(localStorage.getItem("bakiye"));
let formatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
});
let result = formatter.format(bakiye);
$(".bakiye").html("Bakiyeniz:" + result);
//!işlemler

$(".myBtnİslem").click(function (e) {
  e.preventDefault();
  let islemlerim = $("#moneyTakeOrGive").val();
  let girilenTutar = Number($(".inpTutar").val());
  let toastLiveExample = document.getElementById("liveToast");
  if (islemlerim == "Para Çek") {
    if (bakiye > girilenTutar) {
      bakiye = bakiye - girilenTutar;
      localStorage.setItem("bakiye", bakiye);
      turkLirası();
    } else if (girilenTutar > bakiye) {
    
      $(".myBtnİslem").click(() => {
        const toast = new bootstrap.Toast(toastLiveExample,{
          delay:1000
        });
        toast.show();
      });
    } else if (girilenTutar == bakiye) {
      bakiye = girilenTutar - bakiye;
      localStorage.setItem("bakiye", 0);
      let formatter = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
      });
      let result = formatter.format(bakiye);
      $(".bakiye").html("Bakiyeniz:" + result);
    }
  } else if (islemlerim == "Para Yatır") {
    bakiye = bakiye + girilenTutar;
    localStorage.setItem("bakiye", bakiye);
    turkLirası();
    $(".myBtnİslem").click(() => {
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.hide();
    });
  }
});
