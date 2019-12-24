const { login, getUserInfo } = require('../server/user/login');

const loginRouter = (app): void => {
    app.post('/login', login);
    app.post('/getUserInfo', getUserInfo);
};

export {
    loginRouter
};