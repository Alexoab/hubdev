const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { cadaPrimeiraLetraFraseMaiuscula } = require('../utils/functions');
const { InputDocument } = require('../models');

// Create a document
const criarInputDocument = async (registerBody) => {
  if (registerBody.tipo.length >= 16) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Limite de 15 caracteres');
  }
  if (registerBody.label.length >= 36) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Limite de 35 caracteres');
  }
  const documentExist = await InputDocument.findOne({ tipo: registerBody.tipo });
  if (documentExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tipo já cadastrado!');
  }

  // eslint-disable-next-line no-param-reassign
  registerBody.label = cadaPrimeiraLetraFraseMaiuscula(registerBody.label.trim());
  // eslint-disable-next-line no-param-reassign
  registerBody.tipo = registerBody.tipo.trim().replace(' ', '_');

  // eslint-disable-next-line no-param-reassign
  return InputDocument.create(registerBody);
};

const pegarAllInputDocuments = async () => {
  const inputDocument = await InputDocument.find();
  return inputDocument;
};

const deleteInputDocument = async (valorInputId) => {
  const inputDocument = await InputDocument.findById(valorInputId);
  if (!inputDocument) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Valor input não encontrado');
  }
  await inputDocument.remove();
  return inputDocument;
};

module.exports = {
  criarInputDocument,
  pegarAllInputDocuments,
  deleteInputDocument,
};
