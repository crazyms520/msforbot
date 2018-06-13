'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const appleCrawler = require('./modules/crawler');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
  channelID: process.env.CHANNEL_ID,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error('err:' + err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log('event')
  console.log(event);
  // if (event.type !== 'message' || event.message.type !== 'text' || event.type !== 'postback') {
  
  if (event.type !== 'message' && event.type !== 'postback') {
  //   // ignore non-text-message event
    return Promise.resolve(null);
  }

  // if (event.message.text == '??') 

  if (event.source.type == 'user') {
    var user = client.getProfile(event.source.userId);
  } else {
    var user = client.getGroupMemberProfile(event.source.groupId, event.source.userId);
  }

  if (event.type == 'message' && event.message.text == '蘋果') {
    user.then((profile) => {
      return profile
    }).then((echo) =>{
    // }).then(appleCrawler).then((echo) => {
      // create a echoing text message
      // const echo = { type: 'text', text: profile.displayName+' say : '+ apple }
      const test = {
        "type": "template",
        "altText": "風暴兵的回覆",
        "template": {
          "type": "carousel",
          "columns": [{
              "title": "新聞查詢",
              "text": "請選擇品牌",
              "actions": [{
                  "type":"postback",
                  "label":"蘋果",
                  "data":"apple",
                  "text":"apple"
                },
                {
                  "type": "message",
                  "label": "蘋果2",
                  "text": "apple2"
                },
                {
                  "type": "message",
                  "label": "蘋果3",
                  "text": "蘋果"
                }
              ]
            },
            {
              "title": "this is menu",
              "text": "description",
              "actions": [{
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=222"
                },
                {
                  "type": "postback",
                  "label": "Add to cart",
                  "data": "action=add&itemid=222"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://example.com/page/222"
                }
              ]
            }
          ],
          "imageAspectRatio": "rectangle",
          "imageSize": "cover"
        }
      }
      // use reply API
      // return client.replyMessage(event.replyToken, echo);
      return client.replyMessage(event.replyToken, test);
    });
  } else if (event.postback.data == 'apple') {
    console.log('postback');
    console.log(event.postback);
    user.then((profile) => {
      // create a echoing text message
      const echo = {
        type: 'text',
        text: 'I am apple'
      }
      // use reply API
      return client.replyMessage(event.replyToken, echo);
    });
    
  } else {
    user.then((profile) => {
      // create a echoing text message
      const echo = {
        type: 'text',
        text: profile.displayName + ' say : ' + event.message.text
      }
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