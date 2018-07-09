// Create a node server and connect it to a MongoDB database.
// When the node server is started you should drop all the data from the DB, and recreate it.
// You will have two endpoints, 
// `/users` showing a list of all the users from the database
//  and `/users/1` which allows us to specify a specific id 
//  in order to get all the data about a single user. Of course all the output is JSON based.

const express = require('express');
const app = express();

const mongo = require('mongodb');
const MongoClient = mongo.Client;

const url = 'mongodb://localhost:27017';





