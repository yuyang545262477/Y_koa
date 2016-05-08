/*
 * 引入模块
 * */
var app = require('koa')();//实例化 koa
var logger = require('koa-logger'); //日志记录.
var bodyParser = require('koa-bodyparser');//解析请求体.
var staticCache = require('koa-static-cache'); //静态缓存.
var errorHandler = require('koa-errorhandler');//error handler;
var session = require('koa-generic-session');//session.中间件.
var MongoStore = require('koa-generic-session-mongo');//将session 存储到mongodb的中间件.
var flash = require('koa-flash');
var gzip = require('koa-gzip');
var scheme = require('koa-scheme');//参数验证 中间件.
var router = require('koa-frouter');//路由.
var routerCache = require('koa-router-cache');//路由缓存.
var render = require('co-ejs');//静态模板.
var config = require('config-lite');// 配置模块

var merge = require('merge-descriptors');
var core = require('./lib/core');
var renderConf = require(config.renderConf);
merge(renderConf.locals || {}, core, false);

app.keys = [renderConf.locals.$app.name];


/*
 *  配置中间件.
 * */

app.use(errorHandler());
app.use(bodyParser());
app.use(staticCache(app, config.staticCacheConf));
app.use(logger());
app.use(session({
    store: new MongoStore(config.mongodb)
}));
app.use(flash());
app.use(scheme(config.schemeConf));
app.use(routerCache(app, config.routerCacheConf));
app.use(gzip());
app.use(render(app, renderConf));
app.use(router(app, config.routerCacheConf));

app.listen(config.port, function () {
    console.log('Server listening on :  ', config.port);
});