/*
 *  保存自定义的本地变量,用于模板渲染
 * */


var app = require('../package.json');

module.exports = {
    get $app() {
        return app;
    }
};