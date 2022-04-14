const express = require("express");
const fs = require("fs");
const sharp = require("sharp");
const { Client } = require("pg");
const ejs = require("ejs");
const sass = require("sass");
const formidable = require("formidable");
const crypto = require("crypto");
const session = require("express-session");
// const { Client } = require("pg/lib");
// var client = new Client({
//   database: "bd_lamborghini",
//   user: "king",
//   password: "1248",
//   host: "localhost",
//   port: 5432,
// });

var client = new Client({
  host:"ec2-34-197-84-74.compute-1.amazonaws.com",
  database: "d8e6p7u885ffht",
  user: "wabkruepcqhxmn",
  port: 5432,
  password:"a7958fd432307c231627e45a491d74fd4dd8367474908cbb039d002c81049796",
  ssl: {
    rejectUnauthorized: false
  }
});



client.connect();

const obGlobal = { obImagini: null, obErori: null };

app = express();

app.set("view engine", "ejs");

app.use("/resurse", express.static(__dirname + "/resurse"));

app.use("/*", function (req, res, next) {
  res.locals.optiuni = obGlobal.optiuni;
  next();
});

client.query(
  "select * from unnest(enum_range(null::categ_modele))",
  function (err, rezCateg) {
    obGlobal.optiuni = rezCateg.rows;
  }
);

app.get(["/", "/index", "/home"], function (req, res) {
  client.query("select * from cars", function (err, rezQuery) {
    // console.log(rezQuery);
    // console.log(obImagini);
    // console.log("am intrat aici");

    res.render("pagini/index", {
      ip: req.ip,
      imagini: obImagini.imagini,
      produse: rezQuery.rows,
    });
  });

  // console.log(__dirname);
  // res.render("pagini/index", {ip:req.ip, imagini:obImagini.imagini, produse: rezQuery.rows});
  // console.log(obImagini);
  // res.render("pagini/index", {a:req.a});
});

app.get("/produse", function (req, res) {
  console.log("req query");
  console.log(req.query.tip);
  client.query(
    "select * from unnest(enum_range(null::categ_modele))",
    function (err, rezCateg) {
      var cond_where = req.query.tip ? ` tip_produs='${req.query.tip}'` : "1=1";
      console.log("show rezCateg");
      console.log(rezCateg);
      client.query(
        "select * from cars where " + cond_where,
        function (err, rezQuery) {
          // console.log(err);
          // console.log(rezQuery);
          res.render("pagini/produse", {
            produse: rezQuery.rows,
            optiuni: obGlobal.optiuni,
          });
        }
      );
    }
  );
});
app.get("/produs/:id", function (req, res) {
  client.query(
    `select * from cars where id=${req.params.id}`,
    function (err, rezQuery) {
      res.render("pagini/produs", { prod: rezQuery.rows[0] });
    }
  );
});

app.get("/produse/:categ", function (req, res) {
  client.query(
    "select * from unnest(enum_range(null::categ_modele))",
    function (err, rezCateg) {
      client.query(
        `select * from cars where categorie='${req.params.categ}'`,
        function (err, rezQuery) {
          if (err) {
            randeazaEroare(res, 2);
          } else {
            // console.log(err);
            console.log("rezQuery", rezQuery);
            console.log("rezCateg", rezCateg);
            console.log("categ", req.params.categ);
            res.render("pagini/produse", {
              produse: rezQuery.rows,
              optiuni: obGlobal.optiuni,
            });
          }
        }
      );
    }
  );
});

app.get("/galerie-statica", function (req, res) {
  res.render("fragmente/galerie-statica", { imagini: obImagini.imagini });
});

app.get("/*.ejs", function (req, res) {
  // res.status(403).render("pagini/403");
  randeazaEroare(res, 403);
});

app.get("/ceva", function (req, res, next) {
  res.write("Salut");
  next();
});

app.get("/ceva", function (req, res, next) {
  res.write("Pa");
  next();
});

function creeazaImagini() {
  var buf = fs
    .readFileSync(__dirname + "/resurse/json/galerie.json")
    .toString("utf8");
  obImagini = JSON.parse(buf); //global
  // console.log(obImagini);
  for (let imag of obImagini.imagini) {
    let nume_imag, extensie;
    [nume_imag, extensie] = imag.cale_fisier.split("."); // "abc.de".split(".") ---> ["abc","de"]
    // console.log( nume_imag, extensie);
    let dim_mediu = 300;

    imag.mediu = `${obImagini.cale_galerie}/mediu/${nume_imag}-${dim_mediu}.png`; //nume-150.webp // "a10" b=10 "a"+b `a${b}`
    //console.log(imag.mic);
    imag.mare = `${obImagini.cale_galerie}/${imag.cale_fisier}`;
    if (!fs.existsSync(imag.mediu))
      sharp(__dirname + "/" + imag.mare)
        .resize(dim_mediu)
        .toFile(__dirname + "/" + imag.mediu);

    let dim_mic = 150;

    imag.mic = `${obImagini.cale_galerie}/mic/${nume_imag}-${dim_mic}.png`; //nume-150.webp // "a10" b=10 "a"+b `a${b}`
    //console.log(imag.mic);
    imag.mare = `${obImagini.cale_galerie}/${imag.cale_fisier}`;
    if (!fs.existsSync(imag.mic))
      sharp(__dirname + "/" + imag.mare)
        .resize(dim_mediu)
        .toFile(__dirname + "/" + imag.mic);
  }
}

app.get("*/galerie_animata.css", function (req, res) {
  // console.log("am intrat in galerie animata");
  var sirScss = fs
    .readFileSync(__dirname + "/resurse/scss/galerie_animata.scss")
    .toString("utf8");
  // console.log(sirScss);
  var culori = ["navy", "black", "purple", "grey"];
  var indiceAleator = Math.floor(Math.random() * culori.length);
  var culoareAleatoare = culori[indiceAleator];
  rezScss = ejs.render(sirScss, { culoare: culoareAleatoare });
  var caleScss = __dirname + "/temp/galerie_animata.scss";
  // console.log(rezScss);
  fs.writeFileSync(caleScss, rezScss);
  try {
    rezCompilare = sass.compile(caleScss, { sourceMap: true });
    var caleCss = __dirname + "/temp/galerie_animata.css";
    fs.writeFileSync(caleCss, rezCompilare.css);
    res.setHeader("Content-Type", "text/css");
    res.sendFile(caleCss);
  } catch (err) {
    console.log(err);
    res.send("Eroare");
  }
});

parolaServer = "tehniciweb";
app.post("/inreg", function (req, res) {
  var formular = new formidable.IncomingForm();
  formular.parse(req, function (err, campuriText, campuriFisier) {
    console.log();
    var parolaCriptata = crypto
      .scryptSync(campuriText.parola, parolaServer, 64)
      .toString("hex");
    var comandaInserare = `insert into utilizatori (username, nume, prenume, parola, email, culoare_chat) values ('${campuriText.username}', '${campuriText.nume}', '${campuriText.prenume}', '${parolaCriptata}', '${campuriText.email}', '${campuriText.culoare_chat}')`;
    client.query(comandaInserare, function (err, rezInserare) {
      if (err) {
        console.log(err);
      }
    });
    res.send("OK");
  });
});

app.get("/eroare", function (req, res) {
  randeazaEroare(res, 1, "Titlu schimbat");
});

app.get("/*", function (req, res) {
  res.render("pagini" + req.url, function (err, rezRender) {
    if (err) {
      if (err.message.includes("Failed to lookup view")) {
        console.log("Eroare");
        // res.status(404).render("pagini/404");
        randeazaEroare(res, 404);
      } else {
        res.render("pagini/eroare_generala");
      }
    } else {
      console.log("A mers bine");
      res.send(rezRender);
    }
  });
  // console.log("generala:", req.url);
});

creeazaImagini();

function creeazaErori() {
  var buf = fs
    .readFileSync(__dirname + "/resurse/json/erori.json")
    .toString("utf8");
  obErori = JSON.parse(buf); //global
}

creeazaErori();

// randeazaEroare(res, 403);
function randeazaEroare(res, identificator, titlu, text, imagine) {
  var eroare = obErori.erori.find(function (elem) {
    return elem.identificator == identificator;
  });
  titlu = titlu || (eroare && eroare.titlu) || "Titlu eroare custom";
  text = text || (eroare && eroare.text) || "Text eroare custom";
  imagine =
    imagine ||
    (eroare && obErori.cale_baza + "/" + eroare.imagine) ||
    "Imagine eroare custom";
  if (eroare && eroare.status) {
    res.status(eroare.identificator);
  }
  res.render("pagini/eroare_generala", {
    optiuni: obGlobal.optiuni,
    titlu: titlu,
    text: text,
    imagine: imagine,
  });
}

var s_port = process.env.PORT || 8080;
app.listen(s_port);

app.listen(8080);
console.log("They see me coding...");
