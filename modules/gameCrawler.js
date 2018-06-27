const request     = require('request');
const cheerio     = require('cheerio');
// const dateFormate = require('./dateFormate');

function crawler(query) {
    let url = 'https://forum.gamer.com.tw/B.php?';
    return new Promise((resolve, reject) => {
        console.log(url);
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
