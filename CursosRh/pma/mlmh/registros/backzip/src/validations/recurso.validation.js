const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

const createRecurso = {
  body: Joi.object().keys({
    idRegister: Joi.string().required(),
    etapa: Joi.string().required(),
    recurso: Joi.string().required().messages({
      'string.empty': `Justificativa do Recurso não pode ficar vazio`,
      'any.required': `Justificativa do Recurso não pode ficar vazio`,
    }),
    protocolo: Joi.string().required(),
  }),
};
const getRecurso = {
  params: Joi.object().keys({
    protocolo: Joi.string().required(),
  }),
};

const adminUpdateRecurso = {
  body: Joi.object().keys({
    idRecurso: Joi.string().required(),
    justificativa: Joi.string().optional().allow(''),
    status: Joi.string().required(),
  }),
};

const adminUpdateRegistro = {
  body: Joi.object().keys({
    idRegister: Joi.string().required(),
    value: Joi.string().required(),
    campo: Joi.string().required(),
    integrante: Joi.number().optional(),
  }),
};

module.exports = {
  createRecurso,
  getRecurso,
  adminUpdateRecurso,
  adminUpdateRegistro,
};
