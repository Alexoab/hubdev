const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

const createDocumentoRecurso = {
  body: Joi.object().keys({
    idRegister: Joi.string().required(),
    image64: Joi.string().required(),
    cpf: Joi.document().cpf(),
  }),
};
const getTodosDocumentosRecurso = {
  params: Joi.object().keys({
    protocolo: Joi.string().required(),
  }),
};
const deleteDocumentoRecurso = {
  body: Joi.object().keys({
    idDocumento: Joi.string().required(),
  }),
};

module.exports = {
  createDocumentoRecurso,
  getTodosDocumentosRecurso,
  deleteDocumentoRecurso,
};
