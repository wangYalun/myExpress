/**
 * NodeJS文件操作测试
 */

var fs = require('fs');

var path = require('path');

const { URL } = require('url');

var promise = new Promise((resolve, reject) => [

]);

//路径操作


path.basename('D:\\wamp\\licens_.txt');//basename,返回一个path 的最后一部分

path.delimiter; //POSIX :,windows:;

path.dirname('D:\\wamp\\licens_.txt'); //dirname ,返回一个path的目录名

path.extname('index.html');//extname,返回一个扩展名

var urlPath = path.format({
    root: 'allen',
    //dir: 'bob',//如果指定dir ,则root 无效,
    base: 'index.js',
    name: 'index',
    ext: '.js',
});

path.isAbsolute('/wamp/index.js');//true //判断path 是否是绝对路径

path.normalize('/foo/bar//fass'); // windows:\\foo\\bar\\fass ,POSIX:/foo/bar/fass

path.parse('/test/allen/index.js');// {root:'',dir:'test/allen',base:'index.js',ext:'.js',name:'index'}


path.join('path', 'test');

path.relative('/foo/bar/allen/allen.js', '/foo/bar/index.js');// windows:..\\index.js,POSIX:../index.js

path.resolve('foo/bar/', './bar'); // 在当前目录下，D:\\work\\github\\my_json_api\\node_test\\wwwroot\\foo\\bar\\bar'




console.log(urlPath);


//console.log(process.env.PATH.split(path.delimiter));


/**
 * 文件系统
 */
var _action = {
    unlink: function () {
        //删除文件,不可删除文件夹
        fs.unlink('D:\\wamp\\test_dir', (err) => {
            if (err) {
                throw err;
            }
            console.log('删除成功');
        });
    },
    rename: function () {
        //重命名
        fs.rename('D:\\wamp\\test_dir2', 'D:\\wamp\\test_dir', (err) => {
            if (err) {
                throw err;
            }
            console.log('重命名成功');
        })
    },
    stat: function () {
        //获取文件属性
        fs.stat('D:\\wamp\\license.txt', (err, stats) => {
            if (err) throw err;
            //console.log(`${JSON.stringify(stats)}`);
            stats.isFile();
            stats.isDirectory();
        });
    },
    readFileSync: function () {
        console.log(fs.readFileSync(new URL('file:///D:/wamp/license.txt'), 'utf8'));
    },
    access: function () {
        //测试path 指定的目录和文件的用户权限
        fs.access('D:\\wamp\\license.txt', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
            console.log(err ? 'no access' : 'can read or write');
        });
    },
    appendFile: function () {
        //异步追加数据到一个文件，如果文件不存在则创建文件。 
        fs.appendFile('../logs/node_test_log.log', 'allen', (err) => {
            if (err) throw err;
            console.log('添加成功');
        })
    },
    open: function () {
        //打开或创建文件
        fs.open('../logs/node_test_log.log', 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error('the file already exists');
                    return;
                }
                throw err;
            }
        });
    },
    readdir: function () {
        fs.readdir('../models', (err, files) => {
            console.log(files);
        });
    },
    readFile: function () {
        fs.readFile('../logs/node_test_log.log',  (err, data) => {
            console.log(data.toString('base64'));
        })
    }
}

/**
 * fs.Stats 类
 */

/**
 * fs.FSWatcher 类
 */
const _actionFSWatcher = {

}

/**
 * 测试代码
 */

_action.readFile();

/**
 * 写入
 */





//fs.unlinkSync();

