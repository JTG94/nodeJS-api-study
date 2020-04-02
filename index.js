var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var users = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bek'},
    {id: 3, name: 'chris'}
];

//application에 middleware추가
//server console log middleware
app.use(morgan('dev'));
// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//전체 조회 limit
app.get('/users', function(req, res) {
    req.query.limit = req.query.limit || 10;
    
    const limit = parseInt(req.query.limit, 10); // 문자열 "2"이므로 parseInt로 정수형 변환, 10은 진법
    //정수가 아니라면
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

//단건 조회
app.get('/users/:id', function(req, res) {
    const id = parseInt(req.params.id, 10); //params는 :id의 값을 받아올수있다.
    if (Number.isNaN(id)) return res.status(400).end();
    
    const user = users.filter((user) => {  //array의 filter메서드는 특정조건에 만족하는 값을 새 array로 반환함.
        return user.id === id
    })[0]; //array를 반환하기때문에 0번인덱스가 우리가 원하는 값

    if (!user) return res.status(404).end();
    
    res.json(user);
});

//단건 삭제
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();
});

//단건 등록
app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length
    if (isConflict) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user); // 배열에 추가
    res.status(201).json(user);
});

//단건 수정
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();


    user.name = name;

    res.json(user);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app;