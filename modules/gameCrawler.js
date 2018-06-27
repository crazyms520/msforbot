const request     = require('request');
const cheerio     = require('cheerio');
// const dateFormate = require('./dateFormate');

function crawler(url) {
    // let url = 'https://forum.gamer.com.tw/B.php?';

    return new Promise((resolve, reject) => {

        console.log('from:'+url);
        
        let body = 'bsn=21400';
        let result = [];
        // resolve (url);
        request.post({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: url,
            body: body
        }, function (error, response, body) {
            let $ = cheerio.load(body);
            console.log(body)
            resolve(url);
        });
    });
};

module.exports = crawler;
