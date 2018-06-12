const request = require('request');
const cheerio = require('cheerio');

const appleCrawler = function () {
    const url = 'https://tw.appledaily.com/search'
    let data = [];
    let results = request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     url,
        body:    "querystrS=食安&searchType=text&searchMode=Sim"
    }, function(error, response, body){
        let $ = cheerio.load(body);
        $('.tbb > h2').each(function(i, elem) {
            // results.push('蘋果')
            data.push($(this).text())
            data.push($('.tbb > h2 > a').attr('href'))
        })
  });
  return data;
}

module.exports = appleCrawler;
