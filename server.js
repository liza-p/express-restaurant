var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

let tables = [];
let waitlist = [];




app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname,"/public/tables.html"))
   
});
app.get("/api/tables", function(req, res) {
    res.end(tables);
});
app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname,"/public/reserve.html"))
});
app.post("/api/reserve", function(req, res) {
   var newReservation = req.body;
   if(tables.length < 5){
       tables.push(newReservation);
       res.end("table reserved");
   }else{
       waitlist.push(newReservation);
       res.end("waitlist");
   }
});
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname,"index.html"))
    
});





app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
