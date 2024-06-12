const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const secretKey = 'fingerprint_customer';

const authenticate = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Access denied, token missing!' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token!' });
        }
        req.user = user;
        next();
    });
}

module.exports.authenticate = authenticate;