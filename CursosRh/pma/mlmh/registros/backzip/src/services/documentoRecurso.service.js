const { default: axios } = require('axios');
const httpStatus = require('http-status');
const { DocumentoRecurso, Register } = require('../models');
const ApiError = require('../utils/ApiError');

const createDocumentoRecurso = async (reqBody) => {
  const { idRegister, image64, cpf } = reqBody;
  const tipo = 'RECURSO';
  const application = 'MLMH';
  const res = await axios
    .post(
      `https://api.anapolis.go.gov.br/apiupload/upload?application=${application}&idRegister=${idRegister}&tipo=${tipo}&cpf=${cpf}`,
      { image64 }
    )
    .catch((err) => {
      console.error(err);
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Não foi possivel realizar a comunicação com o serviço de upload de arquivos.'
      );
    });

  await DocumentoRecurso.create({ register: idRegister, pathFile: res.data.pathFile });
  const todosDocumentos = await DocumentoRecurso.find({ register: idRegister, ativo: true });
  return todosDocumentos;
};

const getTodosDocumentosRecurso = async (protocolo) => {
  const register = await Register.findOne({ protocolo });
  const todosDocumentos = await DocumentoRecurso.find({ register: register._id, ativo: true });
  if (!todosDocumentos) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Documento não encontrado');
  }
  return todosDocumentos;
};

const adminGetTodosDocumentosRecurso = async () => {
  const todosDocumentos = await DocumentoRecurso.find({});
  return todosDocumentos;
};

const deleteDocumentoRecurso = async (idDocumento) => {
  const documentoEncontrado = await DocumentoRecurso.findOneAndUpdate({ _id: idDocumento }, { ativo: false });
  if (!documentoEncontrado) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Documento não encontrado');
  }
  const todosDocumentos = await DocumentoRecurso.find({ register: documentoEncontrado.register, ativo: true });
  return todosDocumentos;
};

module.exports = {
  createDocumentoRecurso,
  getTodosDocumentosRecurso,
  deleteDocumentoRecurso,
  adminGetTodosDocumentosRecurso,
};
