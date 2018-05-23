'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || XLsoBPLLX1MCIvHjPy/r0A1r1bPZ4s+QgjoU6p+OzEd4dWlQWI8IjTUQhlqm/7XTwdauy+h8NlPLlOdINDAdesvWIERfDlI2AARj0UvCQQx54zSDBV4QC6Fc8/35FLbvXF+G6ukWKfV5CZ/QQ4lMBgdB04t89/1O/w1cDnyilFU=,
  channelSecret: process.env.CHANNEL_SECRET || cd4bff3895d04f4a3079287d19c50fc1,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
