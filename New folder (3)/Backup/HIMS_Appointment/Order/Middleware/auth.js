const jwt = require("jsonwebtoken");
const Repository = require('../repository/dynamodbRepository');
const tableName = require("../Constant/dbTableName");
const message = require('../Constant/constants')

function jwtSign(playLoad, expiresIn) {
    try {
        var token = jwt.sign(
            { playLoad },
            'jwtSecretKey', {
            expiresIn: expiresIn
        });
        return token
    } catch (error) {
        console.log(error);
    }
}

async function VerifyToken(req, res, next) {
    try {
        if (req.headers.authorization == null) {
            return res.status(400).json({ message: "authorization is missing" });
        }
        const bearer = req.headers.authorization.split(" ")
        var token = bearer[1]
        if (!token) {
            return res.status(403).json({ message: "A token is required for authentication" });
        }
        // Verify JWT
        const decoded = await jwt.verify(token, 'jwtSecretKey');
        var key = { 'uuid': decoded.playLoad.id }
        console.log('1111',key);
        const response = await Repository.GetOne(key, tableName.users)
        console.log('12213',response);
        console.log('2345',decoded);
        if (response) {
            req.id = decoded.playLoad.id;
            req.role_name = decoded.playLoad.role_name;
            req.role = decoded.playLoad.role
            req.phone_number = decoded.playLoad.phone_number
            if (decoded.playLoad.role_name != 'super_admin') {
                req.tenant_id = decoded.playLoad.tenant_id;
            }
            next();
        } else {
            return res.status(400).json({ message: "no user found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });

    }

};

function Authorize(permission) {
    return async function (req, res, next) {

        let count = 0;
        if (req.role_name != 'super_admin') {
            if (req.headers.origin == "" || req.headers.origin == undefined) {
                return res.status(400).json({ message: message.domainNotFound })
            }
            const checkTenant = await Repository.queryArray('tenant', 'domain', req.headers.origin)
            if (checkTenant.length == 0) {
                return res.status(200).json({ message: message.domainNotFound })
            } else {
                if (checkTenant[0].uuid != req.tenant_id) {
                    return res.status(200).json({ message: message.tenantAccess })
                }
            }
        }
        for (let i = 0; i < permission.length; i++) {
            if (req.role_name == permission[i]) {
                count = count + 1
            }
        }
        if (count == 0) {
            res.status(403).json({ message: message.access });
        } else {
            next();
        }
    };

    
}

async function duplicate(querys, object) {
    let key
    let value
    let array = Object.keys(object)
    let data = Object.values(object)
    console.log('duplicate object', array)
    let duplicate = []
    for (let item in querys) {
        value = querys[item]
        key = item
        for (let i = 0; i < array.length; i++) {
            if ((array[i] == key) || (0 == data[i].length)) {
                duplicate.push(array[i])
            }
        }
    }

    let response = await array.filter(item => !duplicate.includes(item));
    console.log("response is ", response)
    if (response.length > 0) {
        return response
    }
    return undefined
}

//export function
module.exports = { VerifyToken, Authorize, jwtSign, duplicate}