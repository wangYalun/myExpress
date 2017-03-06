var nodemailer = require('nodemailer');
var fs = require('fs');




var transporter = nodemailer.createTransport({
    aliases: ["QQ Enterprise"],
    domains: ["exmail.qq.com"],
    host: 'smtp.exmail.qq.com',
    port: 465,
    secureConnection: true,
    auth: {
        user: 'allen.wang@gaopeng.com',
        pass: '18942339954Wang'
    }
});


// var transporter = nodemailer.createTransport({

// });

var mailOptions = {
    from: '"allen.wang"allen.wang@gaopeng.com',
    to: ['326402399@qq.com'],//
    cc: ['allen.wang@gaopeng.com'],
    subject: 'Hello nodemailer',
    text: "Hello World?",
    html: fs.createReadStream('public/index.html')
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    } else {

    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});

