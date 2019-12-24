const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const url = require('url');

const CNODE_URL = 'https://cnodejs.org/';

const fetchUrl = (url: String, callback: Function) => {
    superagent.get(url).end((err, res) => {
        if(err) return console.error(err);
        callback(null, {
            url,
            html: res.text
        });
    });
};

const getNews = (requestObj, resultObj) => superagent.get(CNODE_URL).end((err, res) => {
    if(err) return;
    let urls = [];
    let $ = cheerio.load(res.text);

    $('#topic_list .topic_title').each(function (idx, element) {
        let $element = $(element);
        let href = url.resolve(CNODE_URL, $element.attr('href'));
        urls.push(href);
    });
    // 控制并发数量
    async.mapLimit(urls, 7, fetchUrl, (err, res) => {
        const l = res.map(htmlCtx => {
            const { url, html } = htmlCtx;
            let $ = cheerio.load(html);
            return {
                author: $('.user_avatar img').attr('title'),
                title: $('.topic_full_title').text().trim(),
                href: url,
                comment: $('.reply_content').eq(0).text().trim(),
            };
        });
        resultObj.send(l);
    });
});

export {
    getNews
};
