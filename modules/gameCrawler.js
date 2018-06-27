const request     = require('request');
const cheerio     = require('cheerio');
// const dateFormate = require('./dateFormate');

function crawler(url) {
    // let url = 'https://forum.gamer.com.tw/B.php?';

    return new Promise((resolve, reject) => {

        console.log('from:'+url);
        let body = '?bsn=21400';

        let newUrl = url + body;
        
        let result = [];
        // resolve (url);
        request.get(newUrl, function (error, response, body) {
            let $ = cheerio.load(body);
            // $('.b-list__time').each (function(e,elem) {
                
            // });
            $('.b-list__row').each(function(i,elem) {
                console.log($(this).children('.b-list__summary > .b-list__summary__sort').text());
                // console.log($(this).attr('href')+$(this).text());
            });
            // console.log(body)
            resolve(url);
        });
    });
};

module.exports = crawler;
