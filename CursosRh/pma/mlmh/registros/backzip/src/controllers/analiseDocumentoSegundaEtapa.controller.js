const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { analiseDocumentoSegundaEtapaService } = require('../services');

const postAnaliseSegundaEtapaDocumento = catchAsync(async (req, res) => {
  const { user } = req;
  const { idRegister, documentosIrregulares, justificativa } = req.body;
  const analiseCriada = await analiseDocumentoSegundaEtapaService.criarAnaliseSegundaEtapaDocumento(
    user,
    idRegister,
    documentosIrregulares,
    justificativa
  );
  res.status(httpStatus.OK).send(analiseCriada);
});

const getAnaliseSegundaEtapaDocumento = catchAsync(async (req, res) => {
  const { idRegister } = req.query;
  const todosDocumentos = await analiseDocumentoSegundaEtapaService.pegarAnaliseSegundaEtapaDocumento(idRegister);
  res.send(todosDocumentos);
});

const getAllAnaliseSegundaEtapaDocumento = catchAsync(async (req, res) => {
  const todosDocumentos = await analiseDocumentoSegundaEtapaService.pegarTodasAnalisesSegundaEtapaDocumentos();
  res.send(todosDocumentos);
});

const putAnaliseSegundaEtapaDocumento = catchAsync(async (req, res) => {
  const { user } = req;
  const { idRegister, documentosIrregulares, justificativa } = req.body;
  const analiseAtualizada = await analiseDocumentoSegundaEtapaService.atualizarAnaliseSegundaEtapaDocumento(
    user,
    idRegister,
    documentosIrregulares,
    justificativa
  );
  res.status(httpStatus.CREATED).send(analiseAtualizada);
});

module.exports = {
  postAnaliseSegundaEtapaDocumento,
  getAnaliseSegundaEtapaDocumento,
  getAllAnaliseSegundaEtapaDocumento,
  putAnaliseSegundaEtapaDocumento,
};
