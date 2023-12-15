const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

const postAnaliseDocumento = {
  body: Joi.object().keys({
    idRegister: Joi.string().required(),
    documentosIrregulares: Joi.array().items(Joi.string()).optional().allow(''),
    justificativa: Joi.string().required(),
  }),
};

const getAnaliseDocumento = {
  query: Joi.object().keys({
    idRegister: Joi.string().required(),
  }),
};

const putAnaliseDocumento = {
  body: Joi.object().keys({
    idRegister: Joi.string().required(),
    documentosIrregulares: Joi.array().items(Joi.string()).optional().allow(''),
    justificativa: Joi.string().optional(),
  }),
};

module.exports = {
  postAnaliseDocumento,
  getAnaliseDocumento,
  putAnaliseDocumento,
};
