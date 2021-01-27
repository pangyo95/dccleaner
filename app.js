const cleaner = require('./cleaner.js');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let userID, userPW

rl.question("아이디를 입력해주세요. : ", function (user_id) {
    rl.question("비밀번호를 입력해주세요. : ", function (user_pw) {
        userID = user_id;
        userPW = user_pw;
        cleaner(userID, userPW);
        rl.close();
    })
})