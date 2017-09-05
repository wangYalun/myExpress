/**
 * 全局变量 操作测试
 */
var path = require('path');

var test = require('./modules/index');

var test2 = require('./modules/index.js');

var test3 = require('./modules/INDEX');
//Buffer
//_dirname,__filename
(function () {
    //console.log(path.dirname());
    console.log(__dirname); //D:\work\github\my_json_api\node_test
    console.log(__filename);//D:\work\github\my_json_api\node_test

    console.log(path.dirname(__filename), path.basename(__filename));

    //在Nodejs中，文件和模块是一一对应的。

    //当 Node.js 直接运行一个文件时，require.main 会被设为它的 module。 这意味着可以通过 require.main === module 来判断一个文件是否被直接运行：
    if (require.main === module) {
        console.log("该文件直接被运行");
    }

    console.log(require.main.filename);
})();

(function () {
    /**此外，在不区分大小写的文件系统或操作系统中，被解析成不同的文件名可以指向同一文件，
     * 但缓存仍然会将它们视为不同的模块，并多次重新加载。 例如，require('./foo') 和 require('./FOO') 返回两个不同的对象，而不会管./foo 和 ./FOO 是否是相同的文件。
    */
    console.log(test === test2);
    console.log(test === test3);
});



