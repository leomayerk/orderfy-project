const handlers = {};
const Products = require('../products/model/products')

handlers.create = async (req, res) => {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push({
        productId: req.query.productId,
        quantity: 1
    })
    return res.status(200).send(req.session.cart);
}


handlers.list = async (req, res) => {
    console.log(req.session.cart);
    if(!req.session.cart){
        
        return res.status(200).send([]);
    }
    try {
      const ids =[];
      req.session.cart.forEach(item => {
            ids.push(item.productId);
      });

      const products = await Products.find({
          '_id': {
              $in:ids
            }   
      });
      
      const result = [];
      req.session.cart.forEach(item => {
          
        const product = products.find(pro => pro._id.toString() === item.productId);
        result.push({
            ...item,
            product,
        })
        console.log(product);
      });
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send({ error: "Erro ao buscar produtos" });
    }
  };

  handlers.cancel = async (req,res) => {
    req.session.cart = [];
    return res.status(200).send();
  }

  module.exports = handlers;