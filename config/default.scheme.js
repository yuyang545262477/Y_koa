/*
 * 实现注册功能
 * */

var validator = require('validator');
var crypto = require('crypto');

module.exports = {
    "(GET/POST)/signup": {
        "request": {
            "session": CheckNotLogin
        }
    },
    "POST / signup": {
        "request": {
            "body": CheckSignupBody
        }
    },
    "(GET/POST)/signin": {
        "request": {
            "session": CheckNotLogin
        }
    },
    "POST/signin": {
        "request": {
            "body": CheckSigninBody
        }
    }
};

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

//检测未登录
/**
 * @return {boolean}
 */
function CheckNotLogin() {
    if (this.session && this.session.user) {
        this.flash = {error: "已登录"};
        this.redirect('back');
        return false;
    }
    return true;
}

//检测已经登录
/**
 * @return {boolean}
 */
function CheckLogin() {
    if (!this.session || !this.session.user) {
        this.flash = {error: "未登录"};
        this.redirect('/signup');
        return false;
    }
    return true;
}

/**
 * @return {boolean}
 */
function CheckSignupBody() {
    var body = this.request.body;
    var flash;
    if (!body || !body.name) {
        flash = {error: '请填写用户名!'};
    }
    else if (!body.email || !validator.isEmail(body.email)) {
        flash = {error: "请填写正确的邮箱地址"};
    }
    else if (!body.password) {
        flash = {error: "请填写密码"};
    }
    else if (body.password !== body.re_password) {
        flash = {error: "两次密码不匹配"};
    }
    else if (!body.gender || !~['男', '女'].indexOf(body.gender)) {
        flash = {error: "请选择性别"};
    }
    else if (body.signature && body.signature.length > 50) {
        flash = {error: '个性签名不能超过50个字符'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.name = validator.trim(body.name);
    body.email = validator.trim(body.email);
    body.password = md5(validator.trim(body.password));
    return true;
}

/**
 * @return {boolean}
 */
function CheckSigninBody() {
    var body = this.request.body;
    var flash;
    
    if (!body || !body.name) {
        flash = {error: '请填写用户名'};
    }
    else if (!body.password) {
        flash = {error: '请填写密码'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.name = validator.trim(body.name);
    body.password = md5(validator.trim(body.password));
    return true;
}