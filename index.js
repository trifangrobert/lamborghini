const express = require("express");
const fs=require("fs");
const sharp=require("sharp");
const {Client}=require("pg");
// const { Client } = require("pg/lib");
var client = new Client({database: "bd_lamborghini", user:"king", password:"1248", host:"localhost", port:5432});
client.connect();
app = express();

app.set("view engine", "ejs");

app.use("/resurse", express.static(__dirname + "/resurse"));

app.get(["/", "/index", "/home"], function (req, res) {
  client.query("select * from \"Tabel-Test\"", function(err, rezQuery){
    console.log(rezQuery);
    res.render("pagini/index", {ip:req.ip, imagini:obImagini.imagini, produse: rezQuery.rows});
  });
  console.log(__dirname);
  // res.render("pagini/index", {ip:req.ip, imagini:obImagini.imagini, produse: rezQuery.rows});
  // console.log(obImagini);
  // res.render("pagini/index", {a:req.a});
});

app.get("/*.ejs", function (req, res) {
  res.status(403).render("pagini/403");
});

app.get("/ceva", function (req, res, next) {
  res.write("Salut");
  next();
});

app.get("/ceva", function (req, res, next) {
  res.write("Pa");
  next();
});

app.get("/*", function (req, res) {
  res.render("pagini" + req.url, function (err, rezRender) {
    if (err) {
      if (err.message.includes("Failed to lookup view")) {
        console.log("Eroare");
        res.status(404).render("pagini/404");
      }
      else {
          res.render("pagini/eroare_generala");
      }
    } else {
      console.log("A mers bine");
      res.send(rezRender);
    }
  });
  // console.log("generala:", req.url);
});

function creeazaImagini(){
  var buf=fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf8");
  obImagini=JSON.parse(buf);//global
  //console.log(obImagini);
  for (let imag of obImagini.imagini){
      let nume_imag, extensie;
      [nume_imag, extensie ]=imag.fisier.split(".")// "abc.de".split(".") ---> ["abc","de"]
      let dim_mediu=300
      
      imag.mediu=`${obImagini.cale_galerie}/mediu/${nume_imag}-${dim_mediu}.png` //nume-150.webp // "a10" b=10 "a"+b `a${b}`
      //console.log(imag.mic);
      imag.mare=`${obImagini.cale_galerie}/${imag.fisier}`;
      if (!fs.existsSync(imag.mediu))
          sharp(__dirname+"/"+imag.mare).resize(dim_mediu).toFile(__dirname+"/"+imag.mediu);      
  }

}
creeazaImagini();


app.listen(8080);
console.log("They see me coding...");

