// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require('body-parser');

var PORT = 3001;
var app = express();

// set the app up with bodyparser
app.use(bodyParser());

// Database configuration
var databaseUrl = "real-crm_db";
var collections = ["agent", "client"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl , collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//we have to have it befor the routs
/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
  //allow the api to be accessed by other apps
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });

  

app.get('/', function(req, res){
	res.send('hi');
});

app.get('/agent', function(req, res){
	db.agent.find(function(error, data){
		res.json(data);
	})

	// select * from agent;
})

//get is an http method

//'/agent/:id' is a url pattern

// BOTH OF THEM TOGETHER IS a route
// id of an agent
app.get('/agent/:id', function(req, res){

	db.agent.findOne({
	  "_id": mongojs.ObjectID(req.params.id)
	}, function(error, result){
	    res.json(result);
	});

})

/*
	how to hit a post route

	form with a method of POST and an action of /pets/5bb2de27c385cb3290b0e598

	ajax query in JavaScript with a method of post and url of /pets/5bb2de27c385cb3290b0e598

	you can do a curl call also like this:
	curl -X POST http://localhost:3001/pets/5bb2de27c385cb3290b0e598

	in node.js you can use the request package to do post request 
*/
// remove an agent
app.post('/agent/:id', function(req, res){
	//curl -X POST http://localhost:3001/pets/5bb2de27c385cb3290b0e598

	db.agent.remove({
	  "_id": mongojs.ObjectID(req.params.id)
	}, function(error, removed) {
	  if (error) {
	    res.send(error);
	  }else {
	    res.json(req.params.id);
	  }
	});
});

// add an agent
app.post('/agent', function(req, res){
	
	// req.body may look like this: {name: 'fido', age: 3} 

	//curl -d "name=fido&age=3" -X POST http://localhost:3001/pets

	db.agent.insert(req.body, function(error, savedAgent) {
	  // Log any errors
	  if (error) {
	    res.send(error);
	  }else {
	    res.json(savedAgent);
	  }
	});
});

// add an agent
//testing in terminal: curl -d "first_name=monicaa&last_name=levinskyy" -X POST http://localhost:3001/agent/update/5bda4ff0ffbefe0f7dcc0e3b
// this way didn't work for me:
// app.post('/agent/update/:id', function(req, res){
// 	db.agent.update(
// 	{"_id": mongojs.ObjectID(req.param.id)},
// 	{first_name:req.body.first_name, last_name:req.body.last_name}, 

// 		function(error, removed) {
// 	  // Log any errors
// 	  if (error) {
// 	    res.send(error);
// 	  }else {
// 	    res.json(req.params.id);
// 	  }
// 	});
// });

//this way should return agent document:
app.post('/agent/update/:id', function(req, res) {
    //curl -X POST http://localhost:3001/agent/5bda4ff0ffbefe0f7dcc0e3b

    db.agent.findAndModify({
        query: {
            "_id": mongojs.ObjectId(req.params.id)
        },
        update: {
            $set: {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name
            }
        },
        new: true
    }, function(err, editedAgent) {
        res.json(editedAgent);
    });
});





app.listen(PORT, function() {
  console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});



