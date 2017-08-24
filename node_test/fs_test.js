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
        fs.open('../logs/node_test.log', 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error('the file already exists');
                    return;
                }
                throw err;
            }
            console.log(fd);
        });
    },
    readdir: function () {
        fs.readdir('../models', (err, files) => {
            console.log(files);
        });
    },
    readFile: function () {
        console.log(__dirname);
        fs.readFile('../logs/node_test_log.log', (err, data) => {
            console.log(data.toString('base64'));
        })
    },
    writeFile: function () {
        var buf = Buffer.from('这是一首简单的小情歌');
        fs.writeFile('../logs/node_test.txt', buf, (err) => {
            if (err) {
                throw err;
            }
        });
    },
    /**
     * 读文件，读取打开的文件内容到缓冲区中；
     */
    readFileToBuffer: function () {
        fs.open('../logs/node_test.txt', 'r', (err, fd) => {
            if (err) {
                throw err;
            }
            var buf = Buffer.alloc(255);
            console.log(buf.length);
            //每一个汉字utf8编码是3个字节，英文是1个字节
            fs.read(fd, buf, 0, 9, 3, (err, bytesRead, buffer) => {
                if (err) {
                    throw err;
                }
                console.log(buffer.toString());//是一首
            })
        })
    },
    /**
     * 写文件，将缓存区内容写入到文件中
     */
    writeBufferToFile: function () {
        fs.open('../logs/node_test.txt', 'a', (err, fd) => {
            if (err) {
                throw err;
            }
            var buf = Buffer.from('唱着我们心中的白鸽');
            fs.write(fd, buf, (err, written, str) => {
                if (err) {
                    throw err;
                }
            });
        });
    },
    /**
     * 创建目录
     */
    mkdir: function () {
        fs.mkdir('../logs/node_fs_log', (err) => {
            if (err) {
                throw err;
            }
            console.log('目录创建成功');
        })
    },
    /**
     * 删除目录
     */
    rmdir: function () {
        fs.rmdir('../logs/node_fs_log', (err) => {
            setTimeout(() => {
                //5秒后再生成
                this.mkdir();
            }, 5000);

            if (err) {
                throw err;
            }
            console.log('删除目录成功');
        })
    },
    /**
     * 监视文件
     */
    watchFile() {
        fs.watchFile('../logs/node_test.txt', { interval: 20 }, (curr, prev) => {
            if (Date.parse(prev.ctime) == 0) { console.log('文件被创建!'); }
            else if (Date.parse(curr.ctime) == 0) { console.log('文件被删除!') }
            else if (Date.parse(curr.mtime) != Date.parse(prev.mtime)) {
                console.log('文件有修改');
                //取消监视文件
                // fs.unwatchFile('../logs/node_test.txt', (curr, prev) => {
                //     console.log('取消监视文件');
                // });
            }
        });
    },
    /**
     * 监视文件夹
     */
    watchDir() {
        var fsWatcher = fs.watch('../logs', (event, filename) => {

        });

        fsWatcher.on('change', (event, filename) => {
            console.log(filename + "发生变化");
        });

        //30秒后关闭监视

        setTimeout(() => {
            fsWatcher.close((err) => {
                if (err) {
                    throw err;
                }
                console.log('关闭目录监视');
            })
        }, 5000);
    },
    /**
     * 创建读取流
     */
    createReadStream: function () {
        var rs = fs.createReadStream('../logs/test.mp3', { start: 0, end: 2 });

        rs.on('open', (fd) => { console.log('开始读取文件') });

        rs.on('data', (data) => { console.log(data) });

        rs.on('end', () => { console.log('文件读取结束') });

        rs.on('close', () => { console.log('文件关闭') });
        rs.on('error', (err) => { console.log(err) });


        //文件暂停读取
        rs.pause();

        //继续读取
        setTimeout(() => {
            rs.resume();
        }, 2000);
    },
    /**
     * 创建写入流
     */
    createWriteStream: function () {
        var ws = fs.createWriteStream('../logs/node_test2.txt');

        var buf = Buffer.from('我喜欢你\n');

        //写入
        ws.write(buf, (err, buffer) => {
            if (err) {
                throw err;
            }
            console.log('写入完成');
        });
        //最后写入
        ws.end('再见');
    },
    /**
     * 复制文件
     */
    copyFile: function () {
        var rs = fs.createReadStream('../logs/test.mp3');
        var ws = fs.createWriteStream('../logs/test_node_copy.mp3');

        var ws2 = fs.createWriteStream('../logs/test_pipe_copy.mp3');

        rs.on('data', (data) => {
            var flag = ws.write(data);
            console.log(flag);
        });
        rs.on('end', () => {
            console.log('文件读取完成');
        })
        ws.on('drain', () => { console.log('系统缓存区数据已全部输出') });

        rs.pipe(ws2);

        //管道pipe实现流读写



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

_action.copyFile();
/**
 * 写入
 */





//fs.unlinkSync();

