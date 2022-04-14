// window.addEventListener =
//   ("load",
//   function () {
//     document.getElementById("inp-pret").onchange = function () {
//       document.getElementById("infoRange").innerHTML = "(" + this.value + ")";
//     };
//     document.getElementById("filtrare").onclick = function () {
//       console.log("se intampla ceva");
//       var valNume = document.getElementById("inp-nume").value.toLowerCase();
//       var butoaneRadio = document.getElementsByName("gr_rad");
//       for (let rad of butoaneRadio) {
//         if (rad.checked) {
//           var valCalorii = rad.value;
//           break;
//         }
//       }
//       if (valCalorii != "toate") {
//         var minCalorii, maxCalorii;
//         [minCalorii, maxCalorii] = valCalorii.split(":");
//         minCalorii = parseInt(minCalorii);
//         maxCalorii = parseInt(maxCalorii);
//       } else {
//         minCalorii = 0;
//         maxCalorii = 100000000;
//       }
//       var valPret = document.getElementById("inp-pret").value;
//       var valCategorie = document.getElementById("inp-categorie").value;
//       var articole = document.getElementsByClassName("produs");
//       for (let art of articole) {
//         console.log(art);
//         art.style.display = "none";
//         console.log(art.getElementsByClassName("val-name"));
//         let numeArt = art
//           .getElementsByClassName("val-name")[0]
//           .innerHTML.toLowerCase();

//         let cond1 = numeArt.startsWith(valNume);

//         let caloriiArt = parseInt(art.getElementsByClassName("val-calorii")[0]);

//         let cond2 = minCalorii <= caloriiArt && caloriiArt <= maxCalorii;

//         let pretart = parseInt(art.getElementById("val-pret")[0].innerHTML);
//         let cond3 = valPret <= pretart;

//         let categorieArt =
//           art.getElementsByClassName("val-categorie")[0].innerHTML;

//         let cond4 = valCategorie == "toate" || categorieArt == valCategorie;

//         let conditieFinala = cond1 && cond2 && cond3 && cond4;

//         if (conditieFinala) {
//           art.style.display = "block";
//         }
//       }
//     };
//     document.getElementById("resetare").onClick = function () {
//       var articole = document.getElementsByClassName("produs");
//       for (let art of articole) {
//         art.style.display = "block";
//         document.getElementById("inp-nume").value = "";
//         document.getElementById("i_rad4").checked = true;
//         document.getElementById("inp-pret").value = 0;
//         document.getElementById("infoRange").innerHTML = "(0)";
//         document.getElementById("sel-toate").selected = true;
//       }
//     };

//     function sorteaza(semn) {
//       var articole = document.getElementsByClassName("produs");
//       var v_articole = Array.from(articole);
//       v_articole.sort(function (a, b) {
//         var pret_a = parseFloat(
//           a.getElementsByClassName("val-pret")[0].innerHTML
//         );
//         var pret_b = parseFloat(
//           b.getElementsByClassName("val-pret")[0].innerHTML
//         );
//         if (pret_a !== pret_b) {
//           return semn * (pret_a - pret_b);
//         } else {
//           var nume_a = a.getElementsByClassName("val-nume")[0].innerHTML;
//           var nume_b = b.getElementsByClassName("val-nume")[0].innerHTML;
//           return semn * nume_a.localeCompare(nume_b);
//         }
//       });
//       for (let art of v_articole) {
//         art.parentElement.appendChild(art);
//       }
//     }

//     document.getElementById("sortCrescNume").onClick = function () {
//       sorteaza(1);
//     };
//     document.getElementById("sortDescrescNume").onClick = function () {
//       sorteaza(-1);
//     };

//     window.onkeydown = function (e) {
//       console.log(e);
//       if (e.key == "c" && e.altKey) {
//         var p_vechi = document.getElementById("suma");
//         if (!p_vechi) {
//           suma = 0;
//           var articole = document.getElementsByClassName("produs");
//           for (let art of articole) {
//             if (art.style.display != "none") {
//               suma += parseFloat(
//                 art.getElementsByClassName("val-pret")[0].innerHTML
//               );
//             }
//           }
//           var pgf = document.createElement("p");
//           pgf.innerHTML = suma; // <b> Suma </b>
//           pgf.id = "suma";
//           var sectiune = document.getElementById("produse");
//           sectiune.parentNode.insertBefore(pgf, sectiune);
//           setTimeout(function () {
//             var p_vechi = document.getElementById("suma");
//             if (!p_vechi) {
//               p_vechi.remove();
//             }
//           }, 2000);
//         }
//       }
//     };
//   });



window.onload = function () {
  document.getElementById("inp-pret").onchange =  function() {
    document.getElementById("infoRange").innerHTML = "(" + this.value * 1000 + ")";
  };

  document.getElementById("filtrare").onclick = function () {
    var valNume = document.getElementById("inp-nume").value.toLowerCase();
    var butoaneRadio = document.getElementsByName("gr_rad");
    for (let rad of butoaneRadio) {
      if (rad.checked) {
        var valCalorii = rad.value;
        break; 
      }
    }
    if (valCalorii != "toate") {
      var minCalorii, maxCalorii;
      [minCalorii, maxCalorii] = valCalorii.split(":");
      minCalorii = parseInt(minCalorii);
      maxCalorii = parseInt(maxCalorii);
    } else {
      minCalorii = 0;
      maxCalorii = 100000000;
    }

    var valPret = parseInt(document.getElementById("inp-pret").value) * 1000;
    var valCategorie = document.getElementById("inp-categorie").value;
    console.log(valPret, valCategorie);

    var articole = document.getElementsByClassName("produs");
    console.log(articole);
    for (let art of articole) {
      art.style.display = "none";
      // console.log(art);
      // console.log(art.getElementsByClassName("val-nume")[0]);
      let numeArt = art
        .getElementsByClassName("val-nume")[0]
        .innerHTML.toLowerCase();
      // console.log(numeArt);
      let cond1 = numeArt.startsWith(valNume);
      let caloriiArt = parseInt(art.getElementsByClassName("val-calorii")[0].innerHTML);
      console.log(art.getElementsByClassName("val-calorii")[0].innerHTML);
      console.log(cond1, caloriiArt);
      let cond2 = minCalorii <= caloriiArt && caloriiArt < maxCalorii;
      console.log(cond2);
      console.log(art.getElementsByClassName("val-pret")[0].innerHTML);
      let pretart = parseInt(art.getElementsByClassName("val-pret")[0].innerHTML);
      let cond3 = valPret <= pretart;
      let categorieArt =
        art.getElementsByClassName("val-categorie")[0].innerHTML;

      let cond4 = valCategorie == "toate" || categorieArt == valCategorie;

      let conditieFinala = cond1 && cond2 && cond3 && cond4;

      if (conditieFinala) {
        art.style.display = "block";
      }
    }
  };
  document.getElementById("resetare").onclick = function () {
    var articole = document.getElementsByClassName("produs");
    for (let art of articole) {
      art.style.display = "block";
      document.getElementById("inp-nume").value = "";
      document.getElementById("i_rad4").checked = true;
      document.getElementById("inp-pret").value = 0;
      document.getElementById("infoRange").innerHTML = "(0)";
      document.getElementById("sel-toate").selected = true;
    }
  };

  function sorteaza(semn) {
    var articole = document.getElementsByClassName("produs");
    var v_articole = Array.from(articole);
    v_articole.sort(function (a, b) {
      var pret_a = parseFloat(
        a.getElementsByClassName("val-pret")[0].innerHTML
      );
      var pret_b = parseFloat(
        b.getElementsByClassName("val-pret")[0].innerHTML
      );
      if (pret_a !== pret_b) {
        return semn * (pret_a - pret_b);
      } else {
        var nume_a = a.getElementsByClassName("val-nume")[0].innerHTML;
        var nume_b = b.getElementsByClassName("val-nume")[0].innerHTML;
        return semn * nume_a.localeCompare(nume_b);
      }
    });
    for (let art of v_articole) {
      art.parentElement.appendChild(art);
    }
  }

  document.getElementById("sortCrescNume").onclick = function () {
    sorteaza(1);
  };
  document.getElementById("sortDescrescNume").onclick = function () {
    sorteaza(-1);
  };

  window.onkeydown = function (e) {
    console.log(e);
    if (e.key == "c" && e.altKey) {
      var p_vechi = document.getElementById("suma");
      if (!p_vechi) {
        suma = 0;
        var articole = document.getElementsByClassName("produs");
        for (let art of articole) {
          if (art.style.display != "none") {
            suma += parseFloat(
              art.getElementsByClassName("val-pret")[0].innerHTML
            );
          }
        }
        var pgf = document.createElement("p");
        pgf.innerHTML = `<b>Suma: </b> ${suma}`;
        pgf.id = "suma";
        var sectiune = document.getElementById("produse");
        sectiune.parentNode.insertBefore(pgf, sectiune);
        setTimeout(function(){
          var p_vechi = document.getElementById("suma");
          if (p_vechi) {
            p_vechi.remove();
          }
        }, 2000);
      }
    }
  };
};

