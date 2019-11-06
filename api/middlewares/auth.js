const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if (!token_header) return res.status(401).send({ error: 'sem autorização para esta ação' });

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if (err) return res.status(200).send({ error: 'deu bom' });
        return next();
    });
}

module.exports = auth;