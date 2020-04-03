// user api test code

const request = require('supertest');
const should = require('should');
const app = require('../../');

//test 수트
describe('GET /users는 ', () => {
    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다', (done) => {  //작성한 api가 비동기로 동작하기때문에 done 콜백 함수 필요
            request(app)
                .get('/users')
                .end((err, res) => {
                    //응답이 Array인지 검증
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit 갯수만큼 응답한다 ', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    //limit 갯수 검증
                    res.body.should.have.lengthOf(2)
                    done();
                });
        });
    });
    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400) //should로 검증할수 있지만 상태코드 검증 메서드를 제공한다.
                .end(done);
            /*
            .end((err, res) => {
                done();  
            })
            */
        })
    })

});

//user 단건 조회 테스트
describe('GET /users/1는', () => {
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을수 없는 경우 404로 응답한다', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
});

//user 단건 삭제 테스트
describe('DELETE /users/1', () => {
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

//user 단건 등록 테스트 
describe('POST /users', () => {
    describe('성공시', () => {
        let name = 'daniel', body;
        before(done => {
            request(app)
                .post('/users')
                .send({ name }) //body값 입력
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        })
        it('생성된 유저 객체를 반환한다', () => {
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', name);
        });
    });
    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name 중복인 경우 409을 반환한다', done => {
            request(app)
                .post('/users')
                .send({ name: 'daniel' })
                .expect(409)
                .end(done)
        });
    });
});

//user 단건 수정 테스트
describe('PUT /users/:id', () => {
    describe('성공시', () => {
        it('변경된 name을 응답한다', done => {
            const name = 'chally';
            request(app)
                .put('/users/3')
                .send({ name })
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });
    describe('성공시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다', done => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        });
        it('name이 없을 경우 400을 응답한다', done => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        });
        it('없는 유저일 경우 404을 응답한다', done => {
            request(app)
                .put('/users/999')
                .send({ name: 'foo' })
                .expect(404)
                .end(done);
        });
        it('이름이 중복일 경우 409을 응답한다', done => {
            request(app)
                .put('/users/3')
                .send({ name: 'bek' })
                .expect(409)
                .end(done);
        });
    });
});