const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
  idBusiness: { type: String, required: true }
});

ProductsSchema.pre("save", function(next) {
  return next();
});

module.exports = mongoose.model("Products", ProductsSchema);
