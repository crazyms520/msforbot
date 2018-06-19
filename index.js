'use strict';

const line         = require('@line/bot-sdk');
const express      = require('express');
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

  if (event.type === 'message') {
    if (event.message.text === '??') {
      // user.then((profile) => {
      const echo = {
        "type": "template",
        "altText": "風暴兵的回覆",
        "template": {
          "type": "carousel",
          "columns": [{
            "title": "新聞查詢",
            "text": "請選擇品牌",
            "actions": [{
                "type": "postback",
                "label": "蘋果",
                "data": "apple",
                "text": "選擇蘋果",
              },
              {
                "type": "postback",
                "label": "自由",
                "data": "free",
                "text": "選擇自由",
              },
              {
                "type": "message",
                "label": "聯合",
                "data": "union",
                "text": "選擇聯合",
              }
            ]
          }, ],
          "imageAspectRatio": "rectangle",
          "imageSize": "cover"
        }
      }
      // use reply API
      return client.replyMessage(event.replyToken, echo);
      // });
    }

  } else if (event.type === 'postback') {
    const queryStr = ["食藥署", "食品藥物管理署", "食品", "食物", "藥品安全", "藥物", "藥品", "闢謠", "醫療器材", "化妝品", "化粧品", "醫材", "藥物", "藥妝", "藥品安全", "食安法", "食安", "抽驗", "衛生局"]
    // let queryStr = ["食藥署", "食品藥物管理署"]
    // user.then((profile) => {
    // create a echoing text message
    switch (event.postback.data) {
      case 'apple':
        Promise
          .all(queryStr.map(appleCrawler))
          .then((result) => {
            result = result.join('');
            console.log(typeof(result));
            // result = result.replace('/,/g', '');
            console.log(result);
            const echo = 
              {
                type: 'text',
                text: result,
              }
            return client.replyMessage(event.replyToken, echo);
          })
          .catch((err) => {
            console.error('err:' + err);
          });
        break;
      case 'free':
        break;
      case 'union':
        break;
    }
    // use reply API

    // appleCrawler.then((echo) => {
    // return client.replyMessage(event.replyToken, appleCrawler);
    // });
    // user.then((profile) => {
    //   const echo = {
    //     type: 'text',
    //     text: 'I am apple'
    //   }
    //   return client.replyMessage(event.replyToken, echo);
    // });
    // return client.replyMessage(event.replyToken, echo);
    // });
  }

  // if (event.type == 'message' && event.message.text == '??') {
  //   user.then((profile) => {
  //     // }).then(appleCrawler).then((echo) => {
  //     // create a echoing text message
  //     // const echo = { type: 'text', text: profile.displayName+' say : '+ apple }
  //     const test = {
  //       "type": "template",
  //       "altText": "風暴兵的回覆",
  //       "template": {
  //         "type": "carousel",
  //         "columns": [{
  //             "title": "新聞查詢",
  //             "text": "請選擇品牌",
  //             "actions": [{
  //                 "type": "postback",
  //                 "label": "蘋果",
  //                 "data": "apple",
  //               },
  //               {
  //                 "type": "postback",
  //                 "label": "自由",
  //                 "data": "apple"
  //               },
  //               {
  //                 "type": "message",
  //                 "label": "聯合",
  //                 "data": "union"
  //               }
  //             ]
  //           },
  //           {
  //             "title": "this is menu",
  //             "text": "description",
  //             "actions": [{
  //                 "type": "postback",
  //                 "label": "Buy",
  //                 "data": "action=buy&itemid=222"
  //               },
  //               {
  //                 "type": "postback",
  //                 "label": "Add to cart",
  //                 "data": "action=add&itemid=222"
  //               },
  //               {
  //                 "type": "uri",
  //                 "label": "View detail",
  //                 "uri": "http://example.com/page/222"
  //               }
  //             ]
  //           }
  //         ],
  //         "imageAspectRatio": "rectangle",
  //         "imageSize": "cover"
  //       }
  //     }
  //     // use reply API
  //     // return client.replyMessage(event.replyToken, echo);
  //     return client.replyMessage(event.replyToken, test);
  //   });
  // } else if (event.type == 'postback') {
  //   console.log('postback');
  //   console.log(event.postback);
  //   user.then((profile) => {
  //     // create a echoing text message
  //     const echo = {
  //       type: 'text',
  //       text: 'I am apple'
  //     }
  //     // use reply API
  //     return client.replyMessage(event.replyToken, echo);
  //   });

  // } else {
  //   user.then((profile) => {
  //     // create a echoing text message
  //     const echo = {
  //       type: 'text',
  //       text: profile.displayName + ' say : ' + event.message.text
  //     }
  //     // use reply API
  //     return client.replyMessage(event.replyToken, echo);
  //   });
  // }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});