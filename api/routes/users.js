const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
}

router.get('/', async (req, res) => {
    try {
        const users = await users.findOne({});
        return res.status(200).send(users)
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar o usuário' });
    }
})

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: "dados insuficientes" });

    try {
        if (await Users.findOne({ email })) return res.status(400).send({ error: 'usuário já   registrado' });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(200).send({ user, token: createUserToken(user.id) });

    }
    catch (err) {
        if (err) return res.status(500).send({ error: 'Erro ao Buscar Usuário' });
    }


});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: "dados insuficientes" });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.send({ error: 'erro ao buscar usuário' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok) return res.status(500).send({ error: 'erro ao autenticar usuário' });

        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id) });
    } catch (err) {
        if (err) return res.status(500).send({ error: 'Erro ao Buscar Usuário' });

    }

});

module.exports = router;