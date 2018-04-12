var nodemailer = require('nodemailer');
var fs = require('fs');

var emailConfig=require('../config/email.js');



var transporter = nodemailer.createTransport(emailConfig);


// var transporter = nodemailer.createTransport({

// });

var mailOptions = {
    from: '"王雅伦"wangyl@udiannet.com',
    to: ['326402399@qq.com'],//
    //cc: ['wangyl@udiannet.com'],
    subject: 'Hello nodemailer',
    text: "Hello World?",
    //html: fs.createReadStream('public/index.html')
};

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         return console.log(error);
//     } else {

//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });


function sendmail(options) {
    if (!options.from || !/wangyl@udiannet\.com/.test(options.from)) {
        console.log("from 必须要包含 wangyl@udiannet.com");
        return;
    }
    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Message %s send:%s', info.messageIdId, info.response);
    });
}

module.exports = sendmail;

