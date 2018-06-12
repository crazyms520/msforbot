const request = require('request');
const cheerio = require('cheerio');

const appleCrawler = function () {
    const url = 'https://tw.appledaily.com/search'
    
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     url,
        body:    "querystrS=食安&searchType=text&searchMode=Sim"
    }, function(error, response, body){
        let $ = cheerio.load(body);
        results = [];
        $('.tbb > h2').each(function(i, elem) {
            console.log(elem);
            // results.push('蘋果')
            results.push($(this).text())
            results.push($('.tbb > h2 > a').attr('href'))
        })
  });
  return results;
}

module.exports = appleCrawler;
