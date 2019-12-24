const { getNews } = require('../server/reptile/cnode');

const reptileRouter = (app): void => {
    app.get('/news', getNews);
};

export {
    reptileRouter
};