const Business = require("./model/business");
const handlers = {};


handlers.list = async (req, res) => {
    try {
      const filters = {};
      if(req.body.search) {
        filters.$text =  {$search: req.body.search}
      }
      const business = await Business.find(filters)
      return res.status(200).send(business);
    } catch (err) {
      console.log(err)
      return res.status(500).send({ error: "Erro ao buscar empresa" });
    }
  };


handlers.create = async (req, res) => {
  const { razaoSocial, nomeFantasia, cnpjCpf, estado, cidade, ramo } = req.body;

  if (!razaoSocial || !nomeFantasia || !cnpjCpf || !estado || !cidade ||!ramo){
    return res.send({ error: "dados insuficientes pra criar empresa" });
  }
  
  req.body.idUser = req.credentials._id;

  try {
    if (await Business.findOne({ cnpjCpf })) {
      return res.status(400).send({ error: "Empresa já registrada" });
    }

    const business = await Business.create(req.body);
    return res.status(200).send({ business });
  } catch (err) {
    console.log(err);
      return res.status(500).send({ error: "Erro ao Buscar Empresa" });
  }
};

handlers.update = async (req, res) => {
  const { razaoSocial, nomeFantasia, cnpjCpf, estado, cidade, ramo } = req.body;

  if (!razaoSocial || !nomeFantasia || !cnpjCpf || !estado || !cidade ||!ramo) {
    return res.send({ error: "dados insuficientes para a atualização" });
  }

  try {
    const business = await Business.findOne({ cnpjCpf });

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
