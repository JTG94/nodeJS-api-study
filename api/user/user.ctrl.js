// 실제 api 로직 controller

var users = [
    { id: 1, name: 'alice' },
    { id: 2, name: 'bek' },
    { id: 3, name: 'chris' }
];

const index = function (req, res) {
    req.query.limit = req.query.limit || 10;

    const limit = parseInt(req.query.limit, 10); // 문자열 "2"이므로 parseInt로 정수형 변환, 10은 진법
    //정수가 아니라면
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
};

const show = function (req, res) {
    const id = parseInt(req.params.id, 10); //params는 :id의 값을 받아올수있다.
    if (Number.isNaN(id)) return res.status(400).end();

    const user = users.filter((user) => {  //array의 filter메서드는 특정조건에 만족하는 값을 새 array로 반환함.
        return user.id === id
    })[0]; //array를 반환하기때문에 0번인덱스가 우리가 원하는 값

    if (!user) return res.status(404).end();

    res.json(user);
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();
};

const create = (req, res) => {
    const name = req.body.name;

    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length
    if (isConflict) return res.status(409).end();

    const id = Date.now();
    const user = { id, name };
    users.push(user); // 배열에 추가
    res.status(201).json(user);
};

const update = (req, res) => {
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
};

module.exports = {
    index,
    show,
    destroy,
    create,
    update
}