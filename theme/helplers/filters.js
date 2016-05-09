/*
 * 保存自定义的过滤函数
 * 1.格式化时间
 * 2.根据email计算gravatar头像
 * 3.markdown格式转换.
 * */
var gravatar = require('gravatar');
var moment = require('moment');
var md = require('markdown-it')();
var pkg = require('../package.json');


moment.locale(pkg.locale);


module.exports = {
    get fromNow() {
        return function (date) {
            return moment(date).fromNow();
        };
    },
    get gravatar() {
        return gravatar.url;
    },
    get markdown() {
        return function (content) {
            return md.render(content);
        }
    }
};
