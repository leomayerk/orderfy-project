const Business = require("./model/business");
const handlers = {};


handlers.list = async (req, res) => {
    try {
      const business = await business.findOne({});
      return res.status(200).send(business);
    } catch (err) {
      return res.status(500).send({ error: "Erro ao buscar o usuário" });
    }
  };
  

handlers.create = async (req, res) => {
  const { razaoSocial, nomeFantasia, cnpj, estado, cidade } = req.body;

  if (!razaoSocial || !nomeFantasia || !cnpj || !estado || !cidade)
    return res.send({ error: "dados insuficientes" });

  try {
    if (await Business.findOne({ cnpj }))
      return res.status(400).send({ error: "Empresa já registrada" });

    const business = await Business.create(req.body);
  } catch (err) {
    if (err) return res.status(500).send({ error: "Erro ao Buscar Empresa" });
  }
};

handlers.update = async (req, res) => {
  const { razaoSocial, nomeFantasia, cnpj, estado, cidade } = req.body;

  if (!razaoSocial || !nomeFantasia || !cnpj || !estado || !cidade) {
    return res.send({ error: "dados insuficientes para a atualização" });
  }

  try {
    const business = await Business.findOne({ cnpj });

    if (!business) {
      return res
        .status(404)
        .send({ error: "Seu cnpj está incorreto" });
    }
    
    
  } catch (err) {
    if (err) return res.status(500).send({ error: "Erro ao Buscar Usuário" });
  }
};

module.exports = handlers;
