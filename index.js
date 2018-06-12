'use strict';

const line    = require('@line/bot-sdk');
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
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
  console.log (req.body.events);
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

  // if (event.message.text == '??') 

  if (event.source.type == 'user') {
    var user = client.getProfile (event.source.userId);
  } else {
    var user = client.getGroupMemberProfile (event.source.groupId,event.source.userId);
  }
  
  if (event.message.text == '蘋果') {
    var result = user.then((profile) => {
      const url = 'https://tw.appledaily.com/search'
      let data = [];
      let results = request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url:     url,
          body:    "querystrS=食安&searchType=text&searchMode=Sim"
      }, function(error, response, body){
          let $ = cheerio.load(body);
          $('.tbb > h2').each(function(i, elem) {
              // results.push('蘋果')
              data.push($(this).text())
              data.push($('.tbb > h2 > a').attr('href'))
          })
    });
      console.log(data);
      const echo = { type: 'text', text: profile.displayName+' say : '+apple }
      return client.replyMessage(event.replyToken, echo);
    });
  } else {
    var result = user.then((profile) => {
      // create a echoing text message
      const echo = { type: 'text', text: profile.displayName+' say : '+event.message.text }
      // use reply API
      return client.replyMessage(event.replyToken, echo);
    });
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
