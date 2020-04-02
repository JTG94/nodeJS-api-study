const utils = require('./utils');
const should = require('should');

//describe를 활용하여 테스트수트 작성(환경)
describe('utils.js모듈의 capitalize() 함수는', () => {
    //TestCase 작성
    it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
        const result = utils.capitalize('hello');
        //should 검증 사용시 가독성 향상
        result.should.be.equal('Hello');
    })
})