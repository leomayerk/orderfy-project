const chai = require("chai");
const http = require("chai-http");
const subSet = require("chai-subset");

const productSearch = require("../packages/products/handlers");

chai.use(http);
chai.use(subSet);

const productSchema = {
  nome: nome => nome,
  descricao: descricao => descricao
};

describe("teste das funcoes", () => {
  it("create", () => {
    const produto = productSearch.create('pao', 'pão quentinho');
    chai.expect(produto).to.containSubset({productSchema});
  });
  it("list", () => {
    productSearch.create("batata", "batata recheada de vento");
    productSearch.create("guacamole", "guacamole");

    const produto = productSearch.list();

    chai.expect(produto.length).to.be.eql(1);
    chai.expect(produto).to.containSubset([productSchema]);

  });
});
