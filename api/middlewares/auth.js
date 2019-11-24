const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Users = require ('../../api/packages/users/model/user');

const auth =  (req, res, next) => {
    const token_header = req.headers.authorization;

    if (!token_header){
        return res.status(401).send({ error: 'sem autorização para esta ação' });
    }

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if (err) { 
            return res.status(401).send({ error: 'sem autorizacao' });
        }
  
        Users.findById(decoded.id, (err, user)=> {
            if (err) { 
                return res.status(401).send({ error: 'ero au encontrá user ' });
            }

            req.credentials = user;
            return next();
        });
        
    });
}

module.exports = auth;