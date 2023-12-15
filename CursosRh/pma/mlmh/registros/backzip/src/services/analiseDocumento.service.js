const httpStatus = require('http-status');
const { Register, User, InputDocument, AnaliseDocumento, LogAnalise } = require('../models');
const ApiError = require('../utils/ApiError');

const criarAnaliseDocumento = async (user, idRegister, documentosIrregulares, justificativa) => {
  let status;
  if (documentosIrregulares.length === 0) {
    status = 'Classificado';
  }

  if (documentosIrregulares.length >= 1) {
    status = 'Desclassificado';
  }

  // verificar se os inputs nos documentosIrregulares existem no banco
  documentosIrregulares.map(async (item) => {
    const valorEncontrado = await InputDocument.findOne({ id: item._id });
    if (!valorEncontrado) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Valor do Input não encontrado');
    }
  });

  const analiseEncontrada = await AnaliseDocumento.findOne({ register: idRegister });
  if (!analiseEncontrada) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Análise não encontrado');
  }

  const logAnaliseCriada = await LogAnalise.create({
    user: user._id,
    documentosIrregulares,
    justificativa,
    status,
  });

  // Atualiza a analise
  analiseEncontrada.LogAnalise = [logAnaliseCriada._id];
  analiseEncontrada.documentosIrregulares = documentosIrregulares;
  analiseEncontrada.justificativa = justificativa;
  analiseEncontrada.status = status;
  await analiseEncontrada.save();
};

const pegarAnaliseDocumento = async (idRegister) => {
  const analiseEncontrada = await AnaliseDocumento.findOne({ register: idRegister }).populate('register');
  if (!analiseEncontrada) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Analise do documento não encontrado ou não teve irregularidades');
  }
  return analiseEncontrada;
};

const pegarTodasAnalisesDocumentos = async () => {
  const analiseEncontrada = await AnaliseDocumento.find().populate('register');
  if (!analiseEncontrada) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Analises dos documentos não encontrados');
  }
  return analiseEncontrada;
};

const atualizarAnaliseDocumento = async (user, idRegister, documentosIrregulares, justificativa) => {
  const registroEncontrado = await Register.find({ id: idRegister });
  if (!registroEncontrado) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registro não encontrado');
  }

  const usuarioEncontrado = await User.find({ id: user._id });
  if (!usuarioEncontrado) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario não encontrado');
  }

  let status;
  if (documentosIrregulares.length === 0) {
    status = 'Classificado';
  }

  if (documentosIrregulares.length >= 1) {
    status = 'Desclassificado';
  }

  const analiseEncontrada = await AnaliseDocumento.updateMany(
    { register: idRegister },
    { user: user._id, register: idRegister, documentosIrregulares, justificativa, status }
  );
  if (!analiseEncontrada) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Analise do documento não encontrado ou não teve irregularidades');
  }

  return analiseEncontrada;
};

module.exports = {
  criarAnaliseDocumento,
  pegarAnaliseDocumento,
  atualizarAnaliseDocumento,
  pegarTodasAnalisesDocumentos,
};
