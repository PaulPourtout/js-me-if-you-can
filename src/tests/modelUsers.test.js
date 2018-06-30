const app = require('../app');
const User = require('../models/user');
const UserCtrl = require('../controllers/user');
const mockingoose = require('mockingoose').default;

describe('test mongoose User model', () => {
    const usersMock01 = {
            _id: '507f191e810c19729de860ea',
            username: 'name',
            email: 'name@email.com',
            admin: false,
            friends: [],
    };
    const usersMock02 = {
            _id: '507f191e810c19729de860eb',
            username: 'name',
            email: 'name@email.com',
            admin: false,
            friends: [],
    };

    mockingoose.User
        .toReturn(usersMock01, "findOne")
        .toReturn(usersMock02, "save")


    it('Should find one user', () => {
        return User
        .findById({ _id: '507f191e810c19729de860ea'})
        .then(doc => {
            console.log({doc}, {usersMock01});
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(usersMock01);
        })
    })
})
