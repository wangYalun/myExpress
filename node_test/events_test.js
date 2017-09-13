
/**
 * events 操作
 */

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }


const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    console.log('触发了一个事件');
});



myEmitter.on('event', (a, b) => {
    console.log(a, b, this);
});
//截止到目前，event 添加了三个事件,需要确保事件的正确排序且避免竞争条件或逻辑错误。 
//监听器函数可以使用 setImmediate() 或 process.nextTick() 方法切换到异步操作模式：
myEmitter.on('event', function (a, b) {
    setImmediate(() => {
        console.log('', a, b, this);
    })
});
//使用 eventEmitter.once() 方法时可以注册一个对于特定事件最多被调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用。
myEmitter.once('eventOnce', function () {
    console.log('只会调用一次');
});

myEmitter.emit('event', 'a', 'b');

myEmitter.emit('eventOnce');
myEmitter.emit('eventOnce');
//在process 对象是设置uncaughtException 监听器
process.on('uncaughtException', (err) => {
    console.log(err);
});

//myEmitter.emit('error');
//在myEmitter 上注册事件监听器。
myEmitter.on('error', function (err) {
    console.log(err);
});

//myEmitter.emit('error');

//EventEmitter.listenerCount(emitter,eventName)

//emitter.eventNames()
console.log(myEmitter.eventNames());

console.log(myEmitter.listenerCount('event'));

//默认情况下，事件监听器会按照添加的顺序依次调用。 emitter.prependListener() 方法可用于将事件监听器添加到监听器数组的开头。

myEmitter.prependListener('event', function () {
    console.log('触发event事件后，我会第一个执行');
});

myEmitter.prependOnceListener('event', function () {

});
