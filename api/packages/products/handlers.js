const Products = require("./model/products");
const Business = require('../business/model/business')
const handlers = {};


handlers.list = async (req, res) => {
    try {
      const products = await Products.find({});
      return res.status(200).send(products);
    } catch (err) {
      return res.status(500).send({ error: "Erro ao buscar o usuário" });
    }
  };
  

handlers.create = async (req, res) => {
  const { nome, preco, descricao} = req.body;

  const business =  await Business.findOne({idUser: req.credentials._id})

  req.body.idBusiness = business.id;    

  if (!nome || !preco || !descricao) {
    return res.send({ error: "dados insuficientes pra criar produto" });
  }

  console.log(req.body.idBusiness)
  
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
