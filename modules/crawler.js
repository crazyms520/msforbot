const request = require('request');
const cheerio = require('cheerio');
const dateFormate = require('./dateFormate');

const appleCrawler =  new Promise((resolve, reject) => {
        const url      = 'https://tw.appledaily.com/search'
        const today    = dateFormate(new Date());
        const queryStr = ["食藥署", "食品藥物管理署", "食品", "食物", "藥品安全", "藥物", "藥品", "闢謠", "醫療器材", "化妝品", "化粧品", "醫材", "藥物", "藥妝", "藥品安全", "食安法", "食安", "抽驗", "衛生局"]
        const body     = "querystrA="+queryStr+"&searchType=text&searchMode=Adv&page=1&sdate="+today+"&edate="+today+"&source="
        let data = [];
        
        for (const key in queryStr) {
            if (object.hasOwnProperty(key)) {
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url:     url,
                    body:    "querystrA="+queryStr+"&searchType=text&searchMode=Adv&page=1&sdate="+today+"&edate="+today+"&source="
                }, function(error, response, body){
                    let $ = cheerio.load(body);
                    $('.tbb > h2').each(function(i, elem) {
                        // results.push('蘋果')
                        data.push((i+1)+'. '+$(this).text() + '\n' + $(this).children('a').attr('href'))
                        // data.push($(this).children('a').attr('href')+'\n')
                    })
                    data = data.join('\n')
                    
                    if (key == queryStr.length) {
                        const status = true;
                    }
                    
                });
            }
        }

        if (stauts) {
            const echo = { type: 'text', text: data }
                    resolve (echo);
        }
        // request.post({
        //     headers: {'content-type' : 'application/x-www-form-urlencoded'},
        //     url:     url,
        //     body:    "querystrA="+queryStr+"&searchType=text&searchMode=Adv&page=1&sdate="+today+"&edate="+today+"&source="
        // }, function(error, response, body){
        //     let data = [];
        //     let $ = cheerio.load(body);
        //     $('.tbb > h2').each(function(i, elem) {
        //         // results.push('蘋果')
        //         data.push((i+1)+'. '+$(this).text() + '\n' + $(this).children('a').attr('href'))
        //         // data.push($(this).children('a').attr('href')+'\n')
        //     })
        //     data = data.join('\n')
            
        //     const echo = { type: 'text', text: data }
        //     resolve (echo);
        // });
    });
    

module.exports = appleCrawler;
