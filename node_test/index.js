var fs=require('fs');

var index=require('./modules/index.js');




console.log(index.a++);
var index2=require('./index2.js');
console.log(index2.a);

process.nextTick(function(){
    console.log("this is process.nextTick~");
});
console.log("我在前面执行!");

/**
 * Node 环境中的发布/订阅模式
 */
emitter.on("event1",function(message){
    console.log(message);
});

emitter.emit('event1',"I am message!");