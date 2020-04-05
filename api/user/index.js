// /users로 들어오는 요청에대한 컨트롤러와의 바인딩 역할

const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl')

//전체 조회 limit
router.get('/', ctrl.index);

//단건 조회
router.get('/:id', ctrl.show);

//단건 삭제
router.delete('/:id', ctrl.destroy);

//단건 등록
router.post('/', ctrl.create);

//단건 수정
router.put('/:id', ctrl.update);

module.exports = router;
