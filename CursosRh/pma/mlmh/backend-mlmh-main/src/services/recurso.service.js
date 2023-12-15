const httpStatus = require('http-status');
const { Recurso, Register, LogRecurso } = require('../models');
const ApiError = require('../utils/ApiError');

const createRecurso = async (idRegister, recurso, etapa) => {
  const recursoEncontrado = await Recurso.findOne({ register: idRegister, etapa });
  if (recursoEncontrado) {
    recursoEncontrado.recurso = recurso;
    recursoEncontrado.save();
    return recursoEncontrado;
  }
  return Recurso.create({ etapa, recurso, register: idRegister });
};

const getRecurso = async (protocolo) => {
  const register = await Register.findOne({ protocolo });
  const recursoEncontrado = await Recurso.find({ register: register.id }).populate('register').exec();
  if (!recursoEncontrado) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recurso não encontrado');
  }
  return recursoEncontrado;
};

const adminGetTodosRecursos = async () => {
  const todosRecursosEncontrado = await Recurso.find({}).populate('register');
  return todosRecursosEncontrado;
};

const atualizarRecurso = async (idRegister, recurso) => {
  const recursoEncontrado = await Recurso.findOneAndUpdate({ register: idRegister }, { recurso });
  if (!recursoEncontrado) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recurso não encontrado');
  }
  await recursoEncontrado.save();
  return recursoEncontrado;
};

const adminAtualizarStatusRecurso = async (body, user) => {
  const { idRecurso, status, justificativa } = body;
  const { name, username } = user;

  const recursoEncontrado = await Recurso.findById(idRecurso);
  if (!recursoEncontrado) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recurso não encontrado');
  }
  recursoEncontrado.status = status;
  recursoEncontrado.justificativa = justificativa;
  await recursoEncontrado.save();
  await LogRecurso.create({
    user,
    nameUser: name,
    cpfUser: username,
    recurso: recursoEncontrado,
    justificativa: recursoEncontrado.justificativa,
    status: recursoEncontrado.status,
  });

  return recursoEncontrado;
};

const adminAtualizarRegistro = async (body, user) => {
  const registroEncontrado = await Register.findOne({ _id: body.idRegister });
  let valorAntigoRegistro;
  if (!registroEncontrado) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registro não encontrado');
  }

  if (body.integrante) {
    const indexIntegrante = registroEncontrado.integrantes.findIndex((i) => i.integrante === body.integrante);
    valorAntigoRegistro = registroEncontrado.integrantes[indexIntegrante][body.campo];
    registroEncontrado.integrantes[indexIntegrante][body.campo] = body.value;
  } else {
    valorAntigoRegistro = registroEncontrado[body.campo];
    registroEncontrado[body.campo] = body.value;
  }

  await LogRecurso.create({
    user,
    nameUser: user.name,
    cpfUser: user.username,
    register: body.idRegister,
    campo: body.campo,
    value: body.value,
    valorAntigo: valorAntigoRegistro,
  });

  registroEncontrado.save();
  return registroEncontrado;
};

module.exports = {
  createRecurso,
  getRecurso,
  atualizarRecurso,
  adminGetTodosRecursos,
  adminAtualizarStatusRecurso,
  adminAtualizarRegistro,
};
