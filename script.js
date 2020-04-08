
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var prd = [
[
    'ASUS ZenBook Flip 15 UX563FD.jpg',
    'ASUS ZenBook Flip 15 UX563FD',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '4000',
	'visible'
],
  
[
    'Acer Swift 1 SF114-32.jpg',
    'Acer Swift 1 SF114-32',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '2000',
	'visible'
],
  
[
    'Asus TUF FX505DT.jpg',
    'Asus TUF FX505DT',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '3500',
	'visible'
],
  
[
    'Asus VivoBook 15 X540MA.jpg',
    'Asus VivoBook 15 X540MA',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '1250',
	'visible'
],
  
[
    'Dell Inspiron 3584.jpg',
    'Dell Inspiron 3584',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '1500',
	'visible'
],
  
[
    'Hp ProBook 450 G6.jpg',
    'Hp ProBook 450 G6',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '3000',
	'visible'
],
  
[
    'hp.jpg',
    'Hp pavilion 15 cs3003nq',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '3750',
	'visible'
],
  
[
    'Lenovo IdeaPad 330 IKBR.jpg',
    'Lenovo IdeaPad 330 IKBR',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '2750',
	'visible'
],
  
[
    'Lenovo IdeaPad S145.jpg',
    'Lenovo IdeaPad S145',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '2500',
	'visible'
],
  
[
    'Lenovo ThinkPad E490.jpg',
    'Lenovo ThinkPad E490',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '3250',
	'visible'
],
  
[
    'Lenovo V330 IKB.jpg',
    'Lenovo V330 IKB',
    'Procesor: intel core i5-1035G4',
    'Memorie RAM: 16GB',
    'Memorie SSD: 512GB',
    'Placa video: NVIDIA GeForce MX130',
    '1750',
	'visible'
]
  
  
  
  ];
var x;
var cos = [];
var cmd = [];
var com = [];
var af = [];
var aux = [];


app.use(express.static("public/css"));
app.use(express.static("public/imagini"));
app.use(express.static("public/js"));
app.set("view engine", "ejs");



var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');


passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());



app.get("/", function(req, res){
   res.render("index.ejs"); 
});

app.get("/index", function(req, res){
   res.render("index.ejs", {prd:prd}); 
});

app.get("/login", function(req, res){
   res.render("login.ejs"); 
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/admin');
  });


app.get("/produse", function(req, res){
   res.render("produse.ejs", {prd:prd}); 
});

app.get("/promotii", function(req, res){
   res.render("promotii.ejs"); 
});

app.get("/management", require('connect-ensure-login').ensureLoggedIn(), function(req, res){
	console.log(prd);
   res.render("management.ejs"); 
});

app.get("/istoric", require('connect-ensure-login').ensureLoggedIn(), function(req, res){
   res.render("istoric.ejs", {ist:cmd}); 
});

app.get("/listrecenzii", require('connect-ensure-login').ensureLoggedIn(), function(req, res){
   res.render("listrecenzii.ejs"); 
});

app.get("/recenzii", function(req, res){
   res.render("recenzii.ejs"); 
});

app.get("/cosul_meu", function(req, res){
   res.render("cosul_meu.ejs", {cos:cos}); 
});

app.get("/admin", require('connect-ensure-login').ensureLoggedIn(), function(req, res){
   res.render("admin.ejs"); 
});

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/login');
  });


app.get("/prod", function(req, res){
   res.render("prod.ejs", {pr:prd[x], indice: x}); 
});

app.get("/detalii", function(req, res){
   res.render("detalii.ejs"); 
});

app.post("/adgproduse", function(req, res) {	
	
	prd.push(req.body.a);
	console.log(prd);
	
	res.redirect("/produse");
});

app.post("/adgcos", function(req, res) {
	x = req.body.c;
	var ok=1;
	for(var j = 0; j < cos.length; j = j + 1)
	{
		if (cos[j]===prd[x])
		{
			res.redirect("/cosul_meu");
			ok=0;
		}
	}
	if(ok===1)
	{
		cos.push(prd[x]);
		res.redirect("/cosul_meu");
	}
});

app.post("/remove", function(req, res) {
	
	x = req.body.d;
	console.log(x);
	cos.pop(x);
	res.redirect("/cosul_meu");
});

app.post("/pagina", function(req, res) {
	
	x = req.body.e;
	
	res.redirect("/prod");
});

app.post("/add", function(req, res) {
	
	x = req.body.f;
	var ok=1;
	for(var j = 0; j < cos.length; j = j + 1)
	{
		if (cos[j]===prd[x])
		{
			res.redirect("/cosul_meu");
			ok=0;
		}
	}
	if(ok===1)
	{
		cos.push(prd[x]);
		res.redirect("/cosul_meu");
	}
});


app.post("/dezact", function(req,res){
	
	var y = req.body.dez;
	var ok = 1;
	for(var j = 0; j < prd.length; j = j + 1)
	{
		if(prd[j][1]===y)
		{
			prd[j][7]="hide";
			ok=0;
		}
	}
	if(ok===0)
		res.redirect("/produse");
	else
		res.redirect("/management");
});

app.post("/act", function(req,res){
	
	var y = req.body.act;
	var ok = 1;
	for(var j = 0; j < prd.length; j = j + 1)
	{
		if(prd[j][1]===y)
		{
			prd[j][7]="visible";
			ok=0;
		}
	}
	if(ok===0)
		res.redirect("/produse");
	else
		res.redirect("/management");
});

app.post("/cmd", function(req,res) {
	
	cmd.push(req.body.finala);
	console.log(cmd);
	res.redirect("/detalii");
	
});

app.post("/det", function(req,res) {
	
	
	com.push(req.body.nmmm);
	cmd[cmd.length - 1].push(com[0][0]);
	cmd[cmd.length - 1].push(com[0][1]);
	cmd[cmd.length - 1].push(com[0][2]);
	cmd[cmd.length - 1].push(Date());
	af.push(cmd);
	com.pop(0);
	console.log(cmd);
	cos.length=0;
	res.redirect("/produse");
	
});



app.listen(3000, "127.0.0.1", function(){
   console.log("Server started!!!"); 
});