const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { analiseDocumentoService } = require('../services');

const postAnaliseDocumento = catchAsync(async (req, res) => {
  const { user } = req;
  const { idRegister, documentosIrregulares, justificativa } = req.body;
  const analiseCriada = await analiseDocumentoService.criarAnaliseDocumento(
    user,
    idRegister,
    documentosIrregulares,
    justificativa
  );
  res.status(httpStatus.OK).send(analiseCriada);
});

const getAnaliseDocumento = catchAsync(async (req, res) => {
  const { idRegister } = req.query;
  const todosDocumentos = await analiseDocumentoService.pegarAnaliseDocumento(idRegister);
  res.send(todosDocumentos);
});

const getAllAnaliseDocumento = catchAsync(async (req, res) => {
  const todosDocumentos = await analiseDocumentoService.pegarTodasAnalisesDocumentos();
  res.send(todosDocumentos);
});

const putAnaliseDocumento = catchAsync(async (req, res) => {
  const { user } = req;
  const { idRegister, documentosIrregulares, justificativa } = req.body;
  const analiseAtualizada = await analiseDocumentoService.atualizarAnaliseDocumento(
    user,
    idRegister,
    documentosIrregulares,
    justificativa
  );
  res.status(httpStatus.CREATED).send(analiseAtualizada);
});

module.exports = {
  postAnaliseDocumento,
  getAnaliseDocumento,
  putAnaliseDocumento,
  getAllAnaliseDocumento,
};
