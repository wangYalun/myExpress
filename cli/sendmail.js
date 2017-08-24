var sendmail = require('../utils/mail.js');

var fs = require('fs');

sendmail({
    from: '"王雅伦"wangyl@udiannet.com',
    to: '326402399@qq.com',
    subject: 'NodeMailer Test',
    html: fs.createReadStream('../public/index.html')
});