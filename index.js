//root의 index는 express 설정과 서버 실행 로직 
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user');

//application에 middleware추가
//server console log middleware
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//라우팅 설정
app.use('/users', user);

module.exports = app;