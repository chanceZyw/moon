const { login, getUserInfo } = require('../server/user/login');

export const loginRouter = (app): void => {
    app.post('/login', login);
    app.post('/getUserInfo', getUserInfo);
}