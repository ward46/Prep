



var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(function(req, res, next){
    console.log("middleware");  
    next();
  });
app.get('/',function(req,res){
	res.send('<h1>Hello World!</h1>');
});
app.get('/path2',function(req,res){
	res.send('Hello Everyone');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port'));
});
