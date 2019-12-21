const async = require('async');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const express = require('express');

const CNODE_URL = 'https://cnodejs.org/';

const app = express();

const fetchUrl = (url, callback) => {
    superagent.get(url).end((err, res) => {
        if(err) return console.error(err);
        callback(null, {
            url,
            html: res.text
        });
    });
};

const getNews = resultObj => superagent.get(CNODE_URL).end((err, res) => {
    if(err) return;
    let urls = [];
    let $ = cheerio.load(res.text);

    $('#topic_list .topic_title').each(function (idx, element) {
        let $element = $(element);
        let href = url.resolve(CNODE_URL, $element.attr('href'));
        urls.push(href);
    });
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

app.get('/news', (req, res) => {
    getNews(res);
});

app.listen(process.env.PORT || 5000, console.log('服务器启动成功'));
