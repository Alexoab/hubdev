const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { documentoRecursoService } = require('../services');

const createDocumentoRecurso = catchAsync(async (req, res) => {
  const todosDodumentos = await documentoRecursoService.createDocumentoRecurso(req.body);
  res.status(httpStatus.CREATED).send(todosDodumentos);
});

const getTodosDocumentosRecurso = catchAsync(async (req, res) => {
  const { protocolo } = req.params;
  const todosDocumentos = await documentoRecursoService.getTodosDocumentosRecurso(protocolo);
  res.send(todosDocumentos);
});

const adminGetTodosDocuementos = catchAsync(async (req, res) => {
  const todosDocumentos = await documentoRecursoService.adminGetTodosDocumentosRecurso();
  res.send(todosDocumentos);
});

const deleteDocumentoRecurso = catchAsync(async (req, res) => {
  const { idDocumento } = req.body;
  const todosDocumentos = await documentoRecursoService.deleteDocumentoRecurso(idDocumento);
  res.send(todosDocumentos);
});

module.exports = {
  createDocumentoRecurso,
  getTodosDocumentosRecurso,
  deleteDocumentoRecurso,
  adminGetTodosDocuementos,
};
