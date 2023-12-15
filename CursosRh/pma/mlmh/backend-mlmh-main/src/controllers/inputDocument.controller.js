const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { inputDocumentService } = require('../services');

const postInputDocument = catchAsync(async (req, res) => {
  const documentoCriado = await inputDocumentService.criarInputDocument(req.body);
  res.status(httpStatus.CREATED).send(documentoCriado);
});

const getAllInputDocument = catchAsync(async (req, res) => {
  const documentos = await inputDocumentService.pegarAllInputDocuments();
  res.send(documentos);
});

const deleteInputDocument = catchAsync(async (req, res) => {
  const { valorInputId } = req.query;
  await inputDocumentService.deleteInputDocument(valorInputId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  postInputDocument,
  deleteInputDocument,
  getAllInputDocument,
};
