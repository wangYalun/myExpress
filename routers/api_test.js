/**
 * 测试用接口
 */

var express = require('express');

var fs = require('fs');
var path = require('path');

var multer = require('multer');

var ossClient = require('../lib/oss');



var router = express.Router();

router.get('/', function (req, res) {
    var params = req.query || req.params;
    res.json(params);
});

router.get('/get_js', function (req, res) {
    fs.readFile(__dirname + '/api_test.js', function (err, data) {
        if (err) {
            throw err;
        };
        res.send(data.toString());
        //res.sendFile(data.toString());
    });
});

router.get('/get_img', function (req, res) {
    fs.readFile('public/static/yay.44dd3333.jpg', function (err, data) {
        if (err) {
            throw err;
        }
        res.send(data.toString('base64'));
    });
});


router.get('/products', function (req, res) {
    res.json([{ name: "allen", id: 1 }, { name: "bob", id: 2 }]);
});

//利用全局中间件
router.post('/file/upload', function (req, res) {
    res.json(req.body);
});

var memoryStorage = multer.memoryStorage();
var memoryUpload = multer({ storage: memoryStorage });


function writeFile(path, cb) { }

//上传到自定义目录
//上传单个文件
router.post('/file/upload_single', memoryUpload.single('logo'), function (req, res) {

    fs.open('./uploads/api_test_upload/' + req.file.originalname, 'a', (err, fd) => {
        if (err) {
            throw err;
        }
        fs.write(fd, req.file.buffer, (err, written, str) => {
            if (err) {
                throw err;
            }
            res.json({ code: "200" });
        });
    });
});

//上传文件到OSS
router.post("/file/upload_oss", memoryUpload.single('file'), function (req, res) {
    ossClient.put('test/' + req.file.originalname, req.file.buffer).then(function (result) {
        res.json(result);
    })
})

//上传多个文件
router.post('/file/upload_array', memoryUpload.array('logo', 2), function (req, res) {
    req.files.forEach((file, index) => {
        fs.open('./public/api_test_upload/' + file.originalname, 'a', (err, fd) => {
            if (err) {
                throw err;
            }
            fs.write(fd, file.buffer, (err, written, str) => {
                if (err) {
                    throw err;
                }

            });
        });
    });

    res.json({ code: "200", data: req.body });
});

router.post('/file/upload_fields', memoryUpload.fields([{ name: "logo", maxCount: 2 }, { name: "avatar", maxCount: 3 }]), function (req, res) {
    /**
     * req.files['logo][0]->File
     * req.files['avatar'][0]->File
     */
});

var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/api_test_upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

var diskUpload = multer({
    storage: diskStorage,
    fileFilter: function (req, file, cb) {
        // The function should call `cb` with a boolean 
        // to indicate if the file should be accepted 

        // To reject this file pass `false`, like so: 
        cb(null, false)

        // To accept the file pass `true`, like so: 
        cb(null, true)

        // You can always pass an error if something goes wrong: 
        cb(new Error('I don\'t have a clue!'))
    },
    limits: {
        /**
         * 
         */
        fieldNameSize: "100 bytes",// Max field name size, 100 bytes
        fieldSize: "1MB",//Max field value size, 1MB
        fields: "", //Max number of non-file fields Infinity
        fileSize: "",//For multipart forms, the max file size (in bytes) Infinity
        files: "",//For multipart forms, the max number of file fields Infinity
        parts: "", //For multipart forms, the max number of parts (fields + files) Infinity
        headerPairs: "",//For multipart forms, the max number of header key=>value pairs to parse 2000
    }
});

/**
 * 错误处理
 */

router.post('/file/upload_error_handlling', function (req, res) {

    diskUpload(req, res, function (err) {
        if (err) {
            res.json({ msg: "上传文件失败" });
        }
        //TODO 
    });
});


router.get('/web_log', function (req, res) {
    fs.appendFile('./logs/remote_debug.log', new Date() + " " + JSON.stringify(req.query) + "\n", function (err) {
        if (err) {
            //res.sendStatus(404);
            throw err;
        } else {
            res.sendStatus(200);
        }
    });

});


router.post("/file/upload_oss", function (req, res) {

})








module.exports = router;