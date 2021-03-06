var User = require('../models').User;

var request = require('co-supertest');
var app = require('../app');


describe('/signup', function () {
    var agent = request.agent(app);
    
    before(function (done) {
        User.remove({name: 'yuyang'}, done);
    });
    
    after(function (done) {
        User.remove({name: 'yuyang'}, done);
    });
    
    it('GET/ signup without cookie', function *() {
        yield agent.get('/signup').expect(200).end();
    });
    
    it('POST/signup without cookies', function *() {
        yield  agent
        .post('/signup')
        .send({
            name: 'yuyang',
            email: '545262477@qq.com',
            password: '123',
            re_password: '123',
            gender: '男',
            signatrue: '嘿嘿诶黑'
        })
        .expect(302)
        .end();
    });
    
    it('GET /signup with cookie', function *() {
        yield agent.get('/signup').expect(302).end();
    })
    
    it('POST /signup with cookie', function *() {
        yield  agent
        .post('/signup')
        .send({
            name: 'yuyang',
            email: '545262477@qq.com',
            password: '123',
            re_password: '123',
            gender: '男',
            signatrue: '嘿嘿诶黑'
        })
        .expect(302)
        .end();
    });
    
});