const bcrypt = require("bcrypt");

module.exports = {
    hashPassword: password => {
        const saltRounds = 10;

        return bcrypt
        .hash(password, saltRounds)
        .then(hash => hash)
        .catch(err => console.error({ success: false, message: "Password hash failed." }));
    },
    checkPassword: (password, hash) => {
        return bcrypt
        .compare(password, hash)
        .then(res => {
            console.log("result", res);
            return res;
        })
        .catch(err => console.error({ success: false, message: "Password compare failed" }));
    }
};
