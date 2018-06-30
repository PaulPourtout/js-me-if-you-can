const request = require('supertest');
const app = require('../app.js');

test('Should pass integration test', (done) => {
    request(app)
        .get('/api')
        .expect(200, "API")
        .end(err => {
            if (err) throw done(err);
            done()
        })
})