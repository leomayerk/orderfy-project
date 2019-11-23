const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
  razaoSocial: { type: String, required: true, unique: true, lowercase: true },
  nomeFantasia: {
    type: String,
    required: true,
    unique: false,
    lowercase: true
  },
  cnpj: { type: String, required: true, select: false },
  estado: { type: String, required: true },
  cidade: { type: String, required: true },
  ramo: { type: String, required: true }
});

BusinessSchema.pre('save', function (next) {
    return next();
});

module.exports = mongoose.model("Business", BusinessSchema);
