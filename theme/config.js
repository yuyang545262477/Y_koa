module.exports = {
    root: __dirname,
    layout: false,
    viewExt: 'ejs',
    cache: true,
    debug: false,
    filters: require('./helplers/filters'),
    locals: require('./helplers/locals')
};