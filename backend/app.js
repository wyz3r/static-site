var express = require('express');
var app = express();
var path = require('path');

var staticPath = path.join(__dirname , '..','public');

app.get('/',function(req,res){
  res.sendFile(path.join(staticPath,'index.html'));
});

app.use(express.static(staticPath));

app.listen(3000,function() {

	console.log('App listening');
});
