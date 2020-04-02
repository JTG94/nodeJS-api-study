const request = require('supertest');
const should = require('should');
const app = require('./index');

//test 수트
describe('GET /users는 ', () => {
    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다', (done) => {  //작성한 api가 비동기로 동작하기때문에 done 콜백 함수 필요
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })
    })
   
})