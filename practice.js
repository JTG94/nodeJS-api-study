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