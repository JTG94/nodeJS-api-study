const models = require('../models');

module.exports = () => {
    //테스트 돌릴떄만 true 설정
    const options = {
        force: process.env.NODE_ENV === 'test' ? true : false
    }
    return models.sequelize.sync(options); //force 옵션 : 기존에 디비가 있으면 날리고 새로생성
}