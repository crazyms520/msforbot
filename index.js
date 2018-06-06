'use strict';

const line        = require('@line/bot-sdk');
const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
 
// Connection URL
// const url = 'mongodb://localhost:27017';
const url = 'mongodb://sheep520:sheep520@ds251819.mlab.com:51819/heroku_0xplggfh'
 
// Database Name
const dbName = 'heroku_0xplggfh';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  var dd = findDocuments(db, function() {
    client.close();
  });
  
  client.close();
});

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('test');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);

    callback(docs);
  });
}

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
  channelID:process.env.CHANNEL_ID,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
     console.error('err:'+err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

//   // create a echoing text message
  const echo = { type: 'text', text: event.message.text }
  console.log('res1: ' + JSON.stringify(event));
  console.log('res2: ' + JSON.stringify(event.message));

//   // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
