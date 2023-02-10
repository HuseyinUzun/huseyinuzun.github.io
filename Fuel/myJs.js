$(".btnBenzin").click(function (e) {
  e.preventDefault();
  let alınanTutar = Number($(".alınanTutar").val());
  let alınanLitre = Number($(".alınanLitre").val());
  let yapılanKm = Number($(".yapılanKm").val());
  let tarih = $("#date").val();

  let kilometreBasinaFiyat = (alınanTutar / yapılanKm).toFixed(2);
  let litreBasinaFiyat = (alınanTutar / alınanLitre).toFixed(2);

  let gazYakıt = $("#benzinOrGaz").val();

  if (gazYakıt == "Benzin") {
    $("table")
      .append(`<th>BENZİN</th>`)
      .append(`<tr><td>Tarih: ${tarih} </td></tr>`)
      .append(`<tr><td>Alınan Yakıt Tutarı: ${alınanTutar}₺</td></tr>`)
      .append(
        `<tr><td>Kilometrede Harcanan Fiyat: ${kilometreBasinaFiyat}₺ </td></tr>`
      )
      .append(`<tr><td>Yakıt Ücreti: ${litreBasinaFiyat}₺ </td> </tr>`);
    localStorage.setItem("kilometreBasinaFiyat", kilometreBasinaFiyat);
    localStorage.setItem("tarih", tarih);
    localStorage.setItem("litreBasinaFiyat", litreBasinaFiyat);

    var alınanTutarBenzin = alınanTutar;
    
  } else if (gazYakıt == "LPG") {
    $("table")
      .append(`<th>LPG</th>`)
      .append(`<tr><td>Tarih: ${tarih} </td></tr>`)
      .append(`<tr><td>Alınan Yakıt Tutarı: ${alınanTutar}₺ </td></tr>`)
      .append(
        `<tr><td>Kilometrede Harcanan Fiyat: ${kilometreBasinaFiyat}₺ </td></tr>`
      )
      .append(`<tr><td>Yakıt Ücreti: ${litreBasinaFiyat}₺ </td> </tr>`);
    localStorage.setItem("kilometreBasinaFiyat", kilometreBasinaFiyat);
    localStorage.setItem("tarih", tarih);
    localStorage.setItem("litreBasinaFiyat", litreBasinaFiyat);
    var alınanTutarLpg = alınanTutar;
  }
  if (alınanTutarLpg) {
    localStorage.setItem("alınantTutarLpg", alınanTutarLpg);
    localStorage.getItem("alınantTutarBenzin",0)
  } else {
    localStorage.setItem("alınantTutarBenzin", alınanTutarBenzin);
    localStorage.getItem("alınantTutarLpg",0)
  }
});
$(".btnTopla").click(function (e) {
  e.preventDefault();
  if (
    localStorage.getItem("alınantTutarLpg") ||
    localStorage.getItem("alınantTutarBenzin")
  ) {
    $("table").append(
      `<tr><td><strong> YAKIT TOPLAMI:</stong> ${
        Number(localStorage.getItem("alınantTutarLpg")) +
        Number(localStorage.getItem("alınantTutarBenzin"))
      } </td></tr>`
    );
  }
});
