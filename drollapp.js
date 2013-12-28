var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


server.listen(3000);

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(__dirname + '/public'));

app.get('/ideas',function(req,res){
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('testData');
    
    collection.find().toArray(function(err, results) {
        return res.send(results);
        // Let's close the db
        db.close();
      });
    
  }); 
});

app.get('/ideas/:num',function(req,res){
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;
    var v = '{x:'+req.param('num')+'}';
    var collection = db.collection('testData');
    console.log(v);
     
    collection.find({x:10}).toArray(function(err, results) {
        return res.send(results);
        // Let's close the db
        db.close();
      });
    
  }); 
    
});

app.post('/ideas' , function(req,res){
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;
    var collection = db.collection('testData');
     
    collection.insert(req.body, function(err, docs) {
      if(err) throw err;
      db.close();
      //res.statusCode(200);
      return res.send("created the idea");
        // Let's close the db
      
    });
    
  });
});



