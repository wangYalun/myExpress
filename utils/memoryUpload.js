var multer = require('multer');

var memoryStorage = multer.memoryStorage();
var memoryUpload = multer({ storage: memoryStorage });


module.exports = memoryUpload;