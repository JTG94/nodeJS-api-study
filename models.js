const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite', // 파일형태로 저장될 db 경로
    logging: false // default 는 consloe.log 에 바인딩 되어있음 테스트 시 지저분
});

//define 1param : 테이블 명 , 2param : 테이블 속성(id는 자동생성 해줌) 
const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING, // varchar 255
        unique: true
    }
});

module.exports = {Sequelize, sequelize, User};

