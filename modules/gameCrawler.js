const request     = require('request');
const cheerio     = require('cheerio');
// const dateFormate = require('./dateFormate');

function crawler() {
    return new Promise((resolve, reject) => {
        let url = 'https://forum.gamer.com.tw/B.php?';
        console.log('from:'+url);
        // let url = 'https://forum.gamer.com.tw/B.php?'
        // let body = 'bsn=21400';
        // let result = [];
        resolve (1);
        // request.post({
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     url: url,
        //     body: body
        // }, function (error, response, body) {
        //     let $ = cheerio.load(body);
        //     result.push('\n'+'['+query+']'+'\n');
        //     $('.tbb > h2').each(function (i, elem) {
        //         result.push((i + 1) + '. ' + $(this).text() + '\n\n')
        //     })
        //     resolve(result);
        // });
    });
};

module.exports = crawler;
