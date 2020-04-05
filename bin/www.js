const  app = require('../index');
const syncDb = require('./sync-db');

syncDb().then(_=> {
    console.log('Sync database!');
    app.listen(3000, () => {
        console.log('Server is running on 3000 port!');
    });
});

// 콜백 파라미터 언더바 : 인자를 사용하지 않겠다라는 의미, 빈괄호와 같음 ()