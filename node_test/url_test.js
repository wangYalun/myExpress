/**
 * URL操作测试
 */
var url = require('url');

const URL = url.URL;

const URLSearchParams = url.URLSearchParams;


const myURL = new URL("https://www.baidu.com:8080/?name=allen");

const params = new URLSearchParams({
    user: 'allen',
    query: ['bob', 'cici']
});

params.append('age', 20);

params.delete('age');

params.forEach((value, name, thisArg) => {
    console.log(value, name, thisArg === params);
})

console.log(params.toString());

console.log(myURL);


