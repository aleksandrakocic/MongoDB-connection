//Create a node server and connect it to a MongoDB database.
//When the node server is started you should drop all the data from the DB, and recreate it.
//You will have two endpoints, 
//`/users` showing a list of all the users from the database
// and `/users/1` which allows us to specify a specific id 
// in order to get all the data about a single user. Of course all the output is JSON based.


const express = require ('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'users';
let db;

MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log("Database connection successful!");
    db  = client.db(dbName);
  });

app.listen('8080',()=>{
    console.log("listening at 8080")
});

app.get('/', (req,res)=>{
    res.send("go to users")
});


app.post('/index', (req,res)=>{
    addNewData(function(err,result){
        if (err) throw err;
        res.send(result)
    });
});

function addNewData(callback){
    const userInfo = db.collection('users');
    userInfo.insertMany([
		{'name': 'Michael', 'email':'michael@gmail.com', 'password':'111', 'avatar':'img1.jpg'},
		{'name': 'William', 'email':'william@gmail.com', 'password':'222', 'avatar':'img2.jpg'},
		{'name': 'Amy', 'email':'amy@gmail.com', 'password':'333', 'avatar':'img3.jpg'},
], callback)
}

app.get('/users', (req, res) => {

    getUsers({}, function(err, result) {
        if (err) throw err;
        var names = ""
        result.forEach((user) => {
            names += user.name + ', ' + 'User ID:    ' + user._id + '</br>';
        });res.send('Search users by their userID </br> </br>' + 'Users are: </br> </br> ' + names)
    })

})
app.get('/users/:id',(req,res)=>{
    getUsers({'_id': new mongo.ObjectID(req.params.id)},
        function(err,result){
            if(err) throw err;
            res.send(
				'name' + result[0].name + 
				'</br>' + 
				'email' + result[0].email + 
				'</br>' + 
                'avatar' + result[0].avatar)
            }
    )

})

function getUsers(arg,callback){
    const userInfo = db.collection('users');
    userInfo.find(arg).toArray(callback);
}




