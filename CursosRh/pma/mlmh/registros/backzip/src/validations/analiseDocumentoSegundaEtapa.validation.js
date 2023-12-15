const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

const postAnaliseSegundaEtapaDocumento = {
  body: Joi.object().keys({
    idRegister: Joi.string().required(),
    documentosIrregulares: Joi.array().items(Joi.string()).optional().allow(''),
    justificativa: Joi.string().required(),
  }),
};

const getAnaliseDocumentoSegundaEtapa = {
  query: Joi.object().keys({
    idRegister: Joi.string().required(),
  }),
};

const putAnaliseDocumentoSegundaEtapa = {
  body: Joi.object().keys({
    idRegister: Joi.string().required(),
    documentosIrregulares: Joi.array().items(Joi.string()).optional().allow(''),
    justificativa: Joi.string().optional(),
  }),
};

module.exports = {
  getAnaliseDocumentoSegundaEtapa,
  postAnaliseSegundaEtapaDocumento,
  putAnaliseDocumentoSegundaEtapa,
};
