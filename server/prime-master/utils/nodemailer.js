const nodemailer = require("nodemailer");
const smtpTransporter = require('nodemailer-smtp-transport');

module.exports.sendMail =  (req, email, code) => {
    let url = 'http://' + '192.168.0.50:3000'+'/confirmEmail'+'?key='+code;
    let mailOptions = {
        fron: 'juseoung2@gmail.com',
        to: email,
        subject: "이메일 인증을 진행해주세요.",
        html: "<h1>이메일 인증을 위해 URL을 클릭해주세요</h1><br/>"+url
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'juseoung2@gmail.com',
            pass: '48a48a48a'
        }
    });
    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response)
        }
    });
}

module.exports.sendAdminMail =  (req, email, code, companyCode) => {
    let url = 'http://' + '192.168.0.50:3000'+'/confirmEmail'+'?key='+code;
    let mailOptions = {
        fron: 'juseoung2@gmail.com',
        to: email,
        subject: "이메일 인증을 진행해주세요.",
        html: "<h1>이메일 인증을 위해 URL을 클릭해주세요</h1><br/>"+url+"<br/>회사코드입니다.<br/>"+companyCode
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'juseoung2@gmail.com',
            pass: '48a48a48a'
        }
    });
    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response)
        }
    });
}

module.exports.resetPassword =  (req, email, code) => {
    console.log(email)
    let url = 'http://' + '192.168.0.50:3000'+'/resetPassword'+'?key='+code;
    let mailOptions = {
        fron: 'juseoung2@gmail.com',
        to: email,
        subject: "비밀번호 재설정입니다.",
        text: "<h1>비밀번호 재설정을 위해 URL을 클릭해주세요.</h1><br>"+url
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'juseoung2@gmail.com',
            pass: '48a48a48a'
        }
    });
    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response)
        }
    });
}
