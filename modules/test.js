const request     = require('request');
const cheerio     = require('cheerio');

function crawler(url) {
        let result = [];
        request.get(url, function (error, response, body) {
            let $ = cheerio.load(body);
            let words = 0;
            $('.b-list__row').each(function(i,elem) {
                if ($(this).children('.b-list__time').text().includes('今日') && ($(this).children('.b-list__main').children('.b-list__main__title.is-del').length === 0)) {
                    let str = $(this).children('.b-list__main').children('a').text() + ' \n ' + 'https://forum.gamer.com.tw/' + $(this).children('.b-list__main').children('a').attr('href') + ' \n ';
                    words += str.length
                    if ((words += str.length) < 2000) {
                       result.push ($(this).children('.b-list__main').children('a').text() + ' \n ' + 'https://forum.gamer.com.tw/' + $(this).children('.b-list__main').children('a').attr('href') + ' \n ');   
                    }
                }
            });
        });
};
crawler('https://forum.gamer.com.tw/B.php?bsn=21400');