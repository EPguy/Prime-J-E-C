const models = require("../models");
const hCrypto = require("../utils/crypto");
const userController = require("../controllers/user.controller");

exports.accept = async function(req, res, next) {
    const body = req.body;
    console.log(body.email)
    let result = await models.user.update(
        { isJoin: true },
        { where: { email: body.email }}
    ).then(result => {
        if(result) {
            res.send({
                success: true
            })
        } else {
            res.status(403).json({
                message: "유저를 찾을 수 없습니다."
            })
        }
    });
};
exports.refuse = async function(req, res, next) {
    const body = req.body;
    console.log(body.email)
    let result = await models.user.destroy(
        { where: { email: body.email }}
    ).then(result => {
        if(result) {
            res.send({
                success: true
            })
        } else {
            res.status(403).json({
                message: "유저를 찾을 수 없습니다."
            })
        }
    });
    
};

exports.requestJoin = async function(req, res, next) {
    let notJoinUsers = models.user.findAll({
        where: {
            isJoin: false,
            isAdmin: false,
            emailVerified: true,
            companyCode: req.query.companyCode
        }
    }).then(users => {
        res.send(users)
    }).catch(err => {
        console.log(err)
    })
}

exports.JoinUsers = async function(req, res, next) {
    let notJoinUsers = models.user.findAll({
        where: {
            isJoin: true,
            isAdmin: false,
            emailVerified: true,
            companyCode: req.query.companyCode
        }
    }).then(users => {
        res.send(users)
    }).catch(err => {
        console.log(err)
    })
}

exports.create = async function(req, res, next) {
    const body = req.body;
    let companyCode = hCrypto.companyCode();
    let userInfo = userController(req,res);
    if(userInfo.isAdmin === true) {
        let overlap;
        do {
            overlap = await models.company.findOne({
                where: {
                code: companyCode
            }});
        } while(overlap) {
            companyCode = hCrypto.companyCode();
            overlap = await models.company.findOne({
                where: {
                code: companyCode
            }});
        }
    
        if (overlap) {
        res.status(404);
        next();
        } else {
        let company = await models.company.create({
            code: companyCode,
            name: body.name,
            location_x: body.location_x,
            location_y: body.location_y,
        });
        let department = await models.departmentFolder.create({
            name: body.name,
            fno: 1,
            grpno: 1,
            grpord: 1,
            depth: 1,
            companyCode: companyCode
        });
        res.send({company, department});
        }
    } else {
        return res.status(403).json({
            message: "어드민이 아닙니다."
        })
    }
};

exports.editUserInfo = async function(req, res, next) {
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