const request = require('request');
const cheerio = require('cheerio');

const appleCrawler = function (profile) {
    return new Promise((resolve, reject) => {
        const url = 'https://tw.appledaily.com/search'
        let data = [];
        let results = request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     url,
            body:    "querystrA=食安&searchType=text&searchMode=Adv&page=1&sdate=2018-06-11&edate=2018-06-11&source="
        }, function(error, response, body){
            let data = [];
            let $ = cheerio.load(body);
            $('.tbb > h2').each(function(i, elem) {
                // results.push('蘋果')
                data.push((i+1)+'. '+$(this).text() + '\n' + $(this).children('a').attr('href'))
                // data.push($(this).children('a').attr('href')+'\n')
            })
            data = data.join('\n')
            
            // const echo = { type: 'text', text: data }
            resolve (echo);
        });
    });
    
}

module.exports = appleCrawler;
