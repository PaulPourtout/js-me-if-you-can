const request = require('supertest');
const app = require('../app');

test('Should return all users', (done) => {
    request(app)
        .get('/api/users')
        .expect(res => {
            if (!Array.isArray(res.body)) throw new Error("Body type not array");
            if (res.body.length > 1 && typeof res.body[0].username !== 'string') throw new Error("array item username key should be a string");
        })
        .end(err => {
            if (err) throw done(err);
            done();
        })
})
