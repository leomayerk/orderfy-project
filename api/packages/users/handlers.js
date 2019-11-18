const Users = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const handlers = {};

const createUserToken = userId => {
  return jwt.sign({ id: userId }, config.jwt_pass, {
    expiresIn: config.jwt_expires_in
  });
};

handlers.list = async (req, res) => {
  try {
    const users = await users.findOne({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar o usuário" });
  }
};

handlers.create = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send({ error: "dados insuficientes" });

  try {
    if (await Users.findOne({ email }))
      return res.status(400).send({ error: "usuário já registrado" });

    const user = await Users.create(req.body);
    user.password = undefined;
    return res.status(200).send({ user, token: createUserToken(user.id) });
  } catch (err) {
    if (err) return res.status(500).send({ error: "Erro ao Buscar Usuário" });
  }
};

handlers.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "dados insuficientes" });
  }

  try {
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).send({ error: "Seu usuário ou senha está incorreto" });
    }

    const pass_ok = await bcrypt.compare(password, user.password);

    if (!pass_ok)
      return res.status(500).send({ error: "Seu usuário ou senha está incorreto" });

    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });
  } catch (err) {
    if (err) return res.status(500).send({ error: "Erro ao Buscar Usuário" });
  }
};

module.exports = handlers;
