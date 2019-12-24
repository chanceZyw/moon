const { getNews } = require('../server/reptile/cnode');

export const reptileRouter = (app): void => {
    app.get('/news', getNews);
}