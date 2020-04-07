/* ES6 from method
 * arguments : 함수의 파라미터를 주지않아도 arguments객체(배열과비슷한) 형태로 제공
 * -> 가변적인 파라미터일 경우에 사용 
*/
function addMark() {
    let newArray = Array.from(arguments); //arguments로 부터 배열로 만든다.
    let newData = newArray.map(function(value) {  // map은 배열만 쓸 수 있다.
        return value + "!";
    });

    console.log(newData);
};

addMark(1,2,3,4,5,6,7,8);

/*
* Destructuring
* 변수에 배열이나 Object 값을 할당할 수 있다.
* Json 파싱할때도 쓰임.
*/
// 배열
let data = ["crong", "hanux", "jk", "jinny"];
let [jisu,,jung] = data;
console.log(jisu, jung);

// 객체
let obj = {
    name : "crong",
    address : "Korea",
    age : 10
}

let {name, age} = obj;
console.log(name, age);

let {name:myName, age:myAge} = obj;
console.log(myName);

/**
 * Set으로 유니크한 배열만들기 
 * set : 중복없이 유일한 값을 저장하려고 할때, 
 *       이미 존재하는지 체크할 때 유용
 */
let mySet = new Set();

mySet.add("crong");
mySet.add("harry");
mySet.add("crong");

console.log(mySet.has("crong"));
mySet.delete("crong");
mySet.forEach(v => {
    console.log(v);
});
/**
 * WeakSet으로 객체타입 저장하기 
 * weakset : 참조를 가지고 있는 객체만 저장이 가능 
 *           객체가 널로 되거나 필요가없어지면 gc의 대상이 된다. (참조를 모니터링)
 *           객체형태를 중복없이 저장하려고 할때 유용
 */
let arr = [1,2,3,4];
let arr2 = [5,6,7,8];
let wsobj = {arr, arr2};
let ws = new WeakSet();

ws.add(arr);
ws.add(arr2);
ws.add(obj);

arr = null
console.log(ws.has(arr)); // false
console.log(ws);

/**
 * Map & WeakMap
 * Array -> set, weakset
 * Object -> map, weakmap
 * Map : Set과 비슷하지만 key-value 구조 
 */
let wm = new WeakMap();
let myfun = function(){};
// 이 함수가 얼마나 실행됐지?를 알려고 할때
wm.set(myfun, 0);

console.log(wm);

let count = 0;
for(let i=0; i<10; i++) {
    count = wm.get(myfun);
    count++;
    wm.set(myfun, count);
}
console.log(wm.get(myfun));

// weakmap 활용 인스턴스 변수 보호하기
const wm2 = new WeakMap();

function Area(height, width) {
    wm2.set(this, {height, width});
}

Area.prototype.getArea = function() {
    const {height, width} = wm2.get(this);
    return height * width;
}

let myarea = new Area(10,20);
console.log(myarea.getArea());
console.log(myarea.height); // 접근 불가 undefined

/**
 * Template 처리
 * `` 사이에 ${} 변수 값 대입 가능 
 */
const coffee = [
    {
        name : 'coffee-bean',
        order : true,
        items : ['americano', 'milk', 'green-tea']
    },
    {
        name : 'starbucks',
        order : false,
    }
]

const template = `<div>welcome ${coffee[0].name} !!`
console.log(template);

// Tagged template literals
// 없는 값에 접근하려고 하면 undefined -> 함수로 감쌀수 있다. ex) coffee[1].items
function fn(tags, name, items) {
    if(typeof items === "undefined") {
        items = "주문가능한 상품이 없습니다."
    }
    return (tags[0] + name + tags[1] + items + tags[2]);
}

coffee.forEach((v) => {
    const template2 = fn`<div>welcome ${v.name} !!</div><h2>주문가능항목</h2><div>${v.items}</div>`;

    console.log(template2);
})

/**
 * arrow function
 */
setTimeout(() => {
    console.log("settimeout arrow");
}, 1000);
// return 생략 가능
let newArr = [1,2,3,4,5].map( (v) => v * 2);

console.log(newArr);

/**
 * arrow function의 this context
 * arrow는 컨텍스트를 유지하고있어서 bind안해줘도 this사용 가능 
 */
const myObj = {
    runTimeout() {
        setTimeout(function() {
            this.printData(); 
        }.bind(this), 200); // arrow가 아닐때 this는 window라 bind해줘야 됨. 
    },

    printData() {
        console.log("hi codesquad!");
    }
}

myObj.runTimeout();

// arrow 
const myObj2 = {
    runTimeout() {
        setTimeout(() => {
            this.printData(); 
        }, 200); // arrow가 아닐때 this는 window라 bind해줘야 됨. 
    },

    printData() {
        console.log("hi arrow!");
    }
}

myObj2.runTimeout();

/**
 * function default paramaters
 */
//function sum(value, size={value:1}) 오브젝트도 가능
function sum(value, size=1) {
    //size = size || 1; 파라미터가 없으면 1 있으면 size 
    return value * size;
}

/**
 * rest paramaters
 * 펼침 연산자와 비슷한데 조금 다르게 동작 
 * 예상할 수 없는 인자값이 들어오는 경우 arguments 잘 활용 
 * 매개변수에 ...이 들어가면 배열로 받음 (rest paramaters)
 */
function checkNum(...argArray) {   //
    //const argArray = Array.prototype.slice.call(arguments);
    console.log(argArray);
    //toString.call(argArray) 타입 체크 
    const result = argArray.every((v) => typeof v === "number") // 타입 체크
}
const result = checkNum(10,2,3,4,5,"55")

/**
 * ES6 
 * Class 키워드 생겼음 
 * 
 */
// 이전 객체 생성 방식
function Health(name) {
    this.name = name;
}

Health.prototype.showHealth = function() {
    console.log(this.name + "님 안녕하세요.");
}

const h = new Health("crong");
h.showHealth();
// ES6 Class 모습은 다르나 내부적으로는 동일 class = function showHealth = prototype
class Health2 {
    constructor(name, lastTime) {
        this.name = name;
        this.lastTime = lastTime;
    }
    // prototype에 저장 되는 건 마찬가지
    showHealth() {
        console.log("안녕하세요" + this.name);
    }
}

const myHealth = new Health2("crong");
myHealth.showHealth();

/**
 * Object assign으로 JS객체 만들기
 * new 없이도 객체 생성 가능 
 */
const healthObj = {
    showHealth : function() {
        console.log("오늘 운동시간 : ", this.healthTime);
    }
}

const myHealthObj = Object.assign(Object.create(healthObj),{
    name : "crong",
    lastTime : "11:20"
}); //prototype 기반 Object 생성

console.log(myHealthObj);

/**
 * setPrototypeOf : 프로토타입 기능 추가
 */
const healthSet = {
    showHealth : function() {
        console.log("오늘 운동시간 : " + this.healthTime);
    },
    setHealth : function(newTime) {
        this.healthTime = newTime;
    }
}

const myHealth2 = {
    name : "thor",
    lastTime : "11:20"
};

Object.setPrototypeOf(myHealth2, healthSet); // 반환 값은  객체
myHealth2.setHealth(20)
console.log(myHealth2);

/**
 * setPrototypeOf로 객체간 prototype chain 생성하기
 * 일종의 상속 이미 정의된 메서드들을 사용할 수 있음 (재사용성)
 */
//parent
const parentObj = {
    showHealth : function() {
        console.log("오늘 운동시간 : " + this.healthTime);
    },
    setHealth : function(newTime) {
        this.healthTime = newTime;
    }
}

// child
const childObj = {
    getAge : function() {
        return this.age;
    }
}

// prototype chain
Object.setPrototypeOf(childObj, parentObj);

const child = Object.setPrototypeOf({
    age : 22
}, childObj);
child.setHealth("11:00");
child.showHealth();
console.log("child is ", child);

/**
 * module(export & require)의 이해
 */
const log = require("./myLogger");
log.log('my first test data');
console.log(log.getTime());
console.log(log.getCurrentHour());

/**
 * Proxy로 interception 기능 구현
 * 객체를 한번더 감싼 것 toString.call(proxy) -> Object 임
 * Reflect : Object 안의 property 값을 가져올때 사용 함.
 */
const sampleObj = {name : "crong"};
const proxy = new Proxy(sampleObj, {
    get : function(target, property, receiver) { //receiver는 proxy를 가리킴 
        console.log('get value');
        return (property in target) ? Reflect.get(target, property) : "anonymous";
    },
    set : function(target, property, value) { // target은 sampleObj를 가리킴 
        console.log('set value');
        target[property] = value;        
    }
});

proxy.name = "codesquad";  // 값이 변경될때 set 함수가 자동으로 호출 됨 
console.log(proxy.name);
console.log(proxy.dfdfdfd); // anonymous 