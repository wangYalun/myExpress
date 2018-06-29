
//阿里企业邮箱配置
// module.exports = {
//     aliases: ["ali"],
//     domains: ["mxhichina.com"],
//     host: 'smtp.mxhichina.com',
//     port: 25,
//     secureConnection: true,
//     auth: {
//         user: 'wangyl@udiannet.com',
//         pass: '18942339954Wang'
//     }
// };

//腾讯企业邮箱配置
module.exports = {
    host: 'smtp.exmail.qq.com',
    secure:true,
    auth: {
        user: 'wangyl@udiannet.com',
        pass: '18942339954Wang'
    },
    // debug: true,
    logger: true
}
//QQ邮箱配置
// module.exports = {
//     host: "smtp.qq.com", // 主机
//     secure: true, // 使用 SSL
//     port: 465, // SMTP 端口
//     auth: {
//         user: "326402399@qq.com", // 账号
//         pass: "18942339954wang" // 密码
//     },
//     debug:true,
//     logger:true
// }  
