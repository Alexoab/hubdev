const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { recursoService, documentoRecursoService } = require('../services');

const createRecurso = catchAsync(async (req, res) => {
  const { idRegister, recurso, protocolo, etapa } = req.body;
  const recursoCriado = await recursoService.createRecurso(idRegister, recurso, etapa);
  const todosDocumentos = await documentoRecursoService.getTodosDocumentosRecurso(protocolo);
  res.status(httpStatus.CREATED).send({ recursoCriado, todosDocumentos });
});

const getRecurso = catchAsync(async (req, res) => {
  const { protocolo } = req.params;
  const recursoEncontrado = await recursoService.getRecurso(protocolo);
  res.status(httpStatus.OK).send(recursoEncontrado);
});

const updateRecurso = catchAsync(async (req, res) => {
  const { idRegister, recurso } = req.body;
  const recursoAtualizado = await recursoService.atualizarRecurso(idRegister, recurso);
  res.status(httpStatus.CREATED).send(recursoAtualizado);
});

const adminGetTodosRecursos = catchAsync(async (req, res) => {
  const todosRecursosEncontrado = await recursoService.adminGetTodosRecursos();
  res.status(httpStatus.OK).send(todosRecursosEncontrado);
});

const adminUpdateRecurso = catchAsync(async (req, res) => {
  const { body } = req;
  const { user } = req;
  const recursoStatusAtualizado = await recursoService.adminAtualizarStatusRecurso(body, user);
  res.status(httpStatus.CREATED).send(recursoStatusAtualizado);
});

const adminUpdateRegistro = catchAsync(async (req, res) => {
  const { body } = req;
  const { user } = req;
  const recursoRegistroAtualizado = await recursoService.adminAtualizarRegistro(body, user);
  res.status(httpStatus.CREATED).send(recursoRegistroAtualizado);
});

module.exports = {
  createRecurso,
  getRecurso,
  updateRecurso,
  adminGetTodosRecursos,
  adminUpdateRecurso,
  adminUpdateRegistro,
};
