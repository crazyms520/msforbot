const request     = require('request');
const cheerio     = require('cheerio');

function crawler(url) {
    return new Promise((resolve, reject) => {
        let result = [];
        request.get(url, function (error, response, body) {
            let $ = cheerio.load(body);
            $('.b-list__row').each(function(i,elem) {
                if ($(this).children('.b-list__time').text().includes('今日')) {
                 result.push ($(this).children('.b-list__main').children('a').text() + ' \n ' + 'https://forum.gamer.com.tw/' + $(this).children('.b-list__main').children('a').attr('href'));   
                }
                
            });
            resolve(result);
        });
    });
};
module.exports = crawler;
