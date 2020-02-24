const models = require("../models");
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const hCrypto = require("../utils/crypto");
const nodeMailer = require("../utils/nodemailer");
const token = require("../src/token");
const upload = require("../utils/fileupload");
const multer = require('multer');

exports.confirmEmail = async function(req, res, next) {
    let result = await models.user.update(
        { emailVerified:true },
        { where: { emailCode:req.query.key }}
      ).then((user) => {
        console.log(req.query.key)
        console.log(user)
        if(user == 0) {
          res.send({
            success: false
          });
        } else {
          res.send({
            success: true
          })
        }
      }).catch((err) => {
        console.log(err)
    })
}

exports.signUp = async function(req, res, next) {
  let body = req.body;
  let inputPassword = body.password;
  let overlap = await models.user.findOne({
    where: {
      email: body.userEmail
    }
  })
  if (overlap) {
    res.status(404);
    next();
  } else {
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashPassword = hCrypto.hashPassword(inputPassword, salt);
    let emailCode = hCrypto.hashCode();
    let deafultDepartment = await models.departmentFolder.findOne({
        where: {
            companyCode: body.companyCode,
            name: '기본'
        }
    })
    let result = await models.user.create({
      email: body.userEmail,
      password: hashPassword,
      salt: salt,
      name: body.userName,
      dateOfBirth: body.dateOfBirth,
      phoneNumber: body.phoneNumber,
      position: body.position,
      departmentFolderId: deafultDepartment.id,
      companyCode: body.companyCode,
      isAdmin: body.isAdmin,
      emailCode: emailCode
    }).then(result => {
      console.log(body.isAdmin)
      if(!body.isAdmin) {
        nodeMailer.sendMail(req, body.userEmail, emailCode)
      } else {
        nodeMailer.sendAdminMail(req, body.userEmail, emailCode, body.companyCode)
      }
      res.send(result);
    }).catch(err => {
      console.log("에러")
      res.send(err)
    });
  }
};

exports.login = async function(req, res, next) {
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email: body.email
    }
  });
  if(result) {
    let dbPassword = result.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = hCrypto.hashPassword(inputPassword, salt);

    if (dbPassword === hashPassword) {
      let token = jwt.sign(
        {
          email: body.email,
          name: result.name,
          isAdmin: result.isAdmin
        },
        secretObj.secret, // 비밀 키
        {
          expiresIn: "3d",
        }
      );
      res.cookie("user", token);
      res.json({
        token: token
      });
    } else {
      //password error
      res.status(403).json({
        success: false,
        message: "password error"
      });
    }
  } else {
    //email error
    res.status(403).json({
      success: false,
      message: "email error"
    });
  }
  
};

exports.logout = async function(req, res, next) {
  res.clearCookie("user");
  res.send("로그아웃 완료");
};

exports.check = async function(req, res) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "not logged in"
    });
  }

  jwt.verify(token, secretObj.secret, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        success: false,
        message: err.message
      })
    } else {
      models.user.findOne({where: {email: decoded.email}})
      .then(userInfo => {
        return res.send({
          success: true,
          info: userInfo
        })
      });
    }
  });
};

exports.findEmail = async function(req, res) {
  query = req.query;
  let userInfo = await models.user.findOne({where: {email: query.email}});
  if(userInfo) {
    res.json(userInfo);
  } else {
    res.status(403).json({
      success: false,
      message: err.message
    })
  }
};

exports.find = async function(req, res) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "not logged in"
    });
  }

  jwt.verify(token, secretObj.secret, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        success: false,
        message: err.message
      })
    } else {
      return res.send({
        success: true,
        info: decoded
      })
    }
  });
  
  body = req.body;
  let userInfo = await models.user.findOne({where: {email: body.email}});
  return userInfo;
};

exports.editProfile = async function(req, res, next) {
  const body = req.body;
  let result = await models.user.update(
      {
          name: body.name,
          dateOfBirth: body.dateOfBirth,
          phoneNumber: body.phoneNumber,
          position: body.position,
          registrationNumber: body.registrationNumber,
          gender: body.gender,
          accountNumber: body.accountNumber,
          salary: body.salary
      },
      { where: { email: body.email }}
  ).then(result => {
      res.json(result)
  }).catch(err => {
      res.json(err)
  })
};

exports.forgotPassword = async function(req, res, next) {
  if(req.body.email === '') {
    res.status(400).send('email required');
  }
  let result = await models.user.findOne({
    where: {
      email: req.body.email
    }
  }).then(result => {
    console.log(result.dataValues)
    nodeMailer.resetPassword(req, result.dataValues.email, result.dataValues.emailCode)
    res.json(result)
  }).catch(err => {
    res.json(err)
  })
}

exports.resetPassword = async function(req, res, next) {
  if(req.body.code === '') {
    res.status(400).send('code required');
  }
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = hCrypto.hashPassword(req.body.password, salt);
  let result = await models.user.update(
    {
      password: hashPassword,
      salt: salt
    },
    {where: {emailCode: req.body.code}}
  ).then(result => {
    console.log(hashPassword, salt)
    res.json(result)
  }).catch(err => {
    res.json(err)
  })
}

exports.upload = async function(req, res, next) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }
    // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
    return res.json({success:1});
  });
}

exports.companyInfo = async function(req, res, next) {
  let result = await models.company.findOne(
      { where: { code:req.query.code }}
    ).then((comapny) => {
      res.json(comapny)
    }).catch((err) => {
      console.log(err)
  })
}
