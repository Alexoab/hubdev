const Joi = require('joi');
const { objectId } = require('./custom.validation');

const postInputDocument = {
  body: Joi.object().keys({
    tipo: Joi.string().required(),
    label: Joi.string().required(),
  }),
};

const getAllInputDocument = {
  body: Joi.object().keys({}),
};

const deleteInputDocument = {
  query: Joi.object().keys({
    valorInputId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  postInputDocument,
  getAllInputDocument,
  deleteInputDocument,
};
