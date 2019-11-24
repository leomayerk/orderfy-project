const Products = require("./model/products");
const Business = require('../business/model/business')
const handlers = {};


handlers.list = async (req, res) => {
    try {
      const filters = {};

      if(req.query.search) {
        filters.$or = [
          { nome: new RegExp(req.query.search, "gi") },
          { descricao: new RegExp(req.query.search, "gi") },
        ];
      }
      const products = await Products.find(filters);
      return res.status(200).send(products);
    } catch (err) {
      return res.status(500).send({ error: "Erro ao buscar produtos" });
    }
  };
  

handlers.create = async (req, res) => {
  const { nome, preco, descricao} = req.body;

  const business =  await Business.findOne({idUser: req.credentials._id})

  req.body.file = req.file.filename;

  req.body.idBusiness = business.id;

  if (!nome || !preco || !descricao) {
    return res.send({ error: "dados insuficientes pra criar produto" });
  }

  
  
  try {
    const product = await Products.create(req.body);
    return res.status(200).send({ product });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao inserir Produto" });
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
