'use strict';

const line        = require('@line/bot-sdk');
const express     = require('express');
const gameCrawler = require('./modules/gameCrawler');
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
  // if (event.type !== 'message' || event.message.type !== 'text' || event.type !== 'postback') {
  let url;
  if (event.type !== 'message' && event.type !== 'postback') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  if (event.type === 'message') {
    if (event.message.text === '??') {
      const echo = {
        "type": "template",
        "altText": "風暴兵的回覆",
        "template": {
          "type": "carousel",
          "columns": [{
            "title": "巴哈姆特",
            "text": "請選擇品牌",
            "actions": [{
                "type": "postback",
                "label": "暗黑破壞神",
                "data": "D3",
                "text": "選擇暗黑破壞神",
              },
              {
                "type": "postback",
                "label": "麥塊",
                "data": "Minecraft",
                "text": "選擇麥塊",
              },
              {
                "type": "postback",
                "label": "魔物獵人",
                "data": "Mhw",
                "text": "選擇魔物獵人",
              }
            ]
          }, ],
          "imageAspectRatio": "rectangle",
          "imageSize": "cover"
        }
      }
      return client.replyMessage(event.replyToken, echo);
    }

  } else if (event.type === 'postback') {
    switch (event.postback.data) {
      case 'D3':
        url = "https://forum.gamer.com.tw/B.php?bsn=21400";
        break;
      case 'free':
        break;
      case 'union':
        break;
    }

    Promise.all([gameCrawler(url)])
        .then((result) => {
          const echo = {
            type: 'text',
            text: result[0].join('\n')
          }
          console.log(echo);
          return client.replyMessage(event.replyToken, echo);
        })
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});