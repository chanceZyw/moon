const { User } = require('./user.interface');

const login = (req, res) => {
    res.send('登录成功');
};

const getUserInfo = (req, res) => {
    res.send('获取用户信息成功');
}

export {
    login,
    getUserInfo
};