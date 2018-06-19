const request     = require('request');
const cheerio     = require('cheerio');
const stringtags  = require ('striptags');
const dateFormate = require('./dateFormate');

// const queryStr = ["食藥署", "食品藥物管理署", "食品", "食物", "藥品安全", "藥物", "藥品", "闢謠", "醫療器材", "化妝品", "化粧品", "醫材", "藥物", "藥妝", "藥品安全", "食安法", "食安", "抽驗", "衛生局"]

function crawler(query) {
    return new Promise((resolve, reject) => {
        const url   = 'https://tw.appledaily.com/search'
        const today = dateFormate(new Date());
        let body = "querystrA=" + query + "&searchType=text&searchMode=Adv&page=1&sdate=" + today + "&edate=" + today + "&source="
        let result = []
        request.post({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: url,
            body: body
        }, function (error, response, body) {
            let $ = cheerio.load(body);
            console.log($);
            $('.tbb > h2').each(function (i, elem) {
                result.push('['+query+']'+'\n'+(i + 1) + '. ' + stringtags($(this).text()).slice(0,10)+'...' + '\n' + $(this).children('a').attr('href') + '\n')
            })
            console.log(result);
            resolve(result);
        });
    });
}


module.exports = crawler;

// const fulfilled = Promise
//     .all(queryStr.map(crawler))
//     .then((result) => {
//         // console.log(crawler)
//     //   console.log(result);
//       data = result.join('\n')
//       const echo = { type: 'text', text: data }
//         module.exports = fulfilled;
//     })
//     .catch((err) => {
//       console.error('err:' + err);
//       res.status(500).end();
//     });

// const appleCrawler = new Promise((resolve, reject) => {
//     const url = 'https://tw.appledaily.com/search'
//     const today = dateFormate(new Date());
//     const queryStr = ["食藥署", "食品藥物管理署", "食品", "食物", "藥品安全", "藥物", "藥品", "闢謠", "醫療器材", "化妝品", "化粧品", "醫材", "藥物", "藥妝", "藥品安全", "食安法", "食安", "抽驗", "衛生局"]
//     const body = "querystrA=" + queryStr + "&searchType=text&searchMode=Adv&page=1&sdate=" + today + "&edate=" + today + "&source="
//     const status = false;
//     let data = [];
//     for (const key in queryStr) {
//         if (queryStr.hasOwnProperty(key)) {
//             request.post({
//                 headers: {
//                     'content-type': 'application/x-www-form-urlencoded'
//                 },
//                 url: url,
//                 body: "querystrA=" + queryStr + "&searchType=text&searchMode=Adv&page=1&sdate=" + today + "&edate=" + today + "&source="
//             }, function (error, response, body) {
//                 let $ = cheerio.load(body);
//                 $('.tbb > h2').each(function (i, elem) {
//                     data.push((i + 1) + '. ' + $(this).text() + '\n' + $(this).children('a').attr('href'))
//                 })
//             });
//         }
//     }

//     if (status) {
//         data = data.join('\n')
//         const echo = {
//             type: 'text',
//             text: data
//         }
//         console.log(echo);
//         resolve(echo);
//     }
//     // request.post({
//     //     headers: {'content-type' : 'application/x-www-form-urlencoded'},
//     //     url:     url,
//     //     body:    "querystrA="+queryStr+"&searchType=text&searchMode=Adv&page=1&sdate="+today+"&edate="+today+"&source="
//     // }, function(error, response, body){
//     //     let data = [];
//     //     let $ = cheerio.load(body);
//     //     $('.tbb > h2').each(function(i, elem) {
//     //         // results.push('蘋果')
//     //         data.push((i+1)+'. '+$(this).text() + '\n' + $(this).children('a').attr('href'))
//     //         // data.push($(this).children('a').attr('href')+'\n')
//     //     })
//     //     data = data.join('\n')

//     //     const echo = { type: 'text', text: data }
//     //     resolve (echo);
//     // });
// });
