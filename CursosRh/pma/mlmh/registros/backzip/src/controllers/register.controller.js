const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { registerService, smsService } = require('../services');

const createRegister = catchAsync(async (req, res) => {
  const { protocolo } = await registerService.createRegister(req.body);
  await smsService.sendProtocolSms(req.body.fone_celular, req.body.nome, protocolo);
  res.status(httpStatus.CREATED).json({ protocolo });
});

const updateRegister = catchAsync(async (req, res) => {
  const user = await registerService.updateRegisterService(req.body);
  // await smsService.sendMsgAtualizadoRegisterSms(user.fone_celular, user.nome, user.protocolo);
  res.json({
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
    rg: user.rg,
    uf_rg: user.uf_rg,
    dt_nascimento: user.dt_nascimento,
    fone_celular: user.fone_celular,
    fone_fixo: user.fone_fixo,
    sexo: user.sexo,
    portador_pcd: user.portador_pcd,
    estado_civil: user.estado_civil,
    nacionalidade: user.nacionalidade,
    cep: user.cep,
    logradouro: user.logradouro,
    quadra: user.quadra,
    lote: user.lote,
    complemento: user.complemento,
    bairro: user.bairro,
    localidade: user.localidade,
    uf: user.uf,
    reside_ano: user.reside_ano,
    renda_bruta: user.renda_bruta,
    cadunico: user.cadunico,
    numero_cadunico: user.numero_cadunico,
    possui_imovel: user.possui_imovel,
    contemplado_habitacional: user.contemplado_habitacional,
    comprador_imovel: user.comprador_imovel,
    arrimo_familia: user.arrimo_familia,
    vitima_violencia: user.vitima_violencia,
    grupo_familiar: user.grupo_familiar,
    integrantes: user.integrantes,
    protocolo: user.protocolo,
  });
});

const updateParcialRegister = catchAsync(async (req, res) => {
  const usuarioAtualizado = await registerService.updateRegisterService(req.body);
  res.status(200).send(usuarioAtualizado);
});

const loginProtocolo = catchAsync(async (req, res) => {
  const { protocolo } = req.body;
  const user = await registerService.loginWithProtocol(protocolo);
  res.status(httpStatus.OK).send(user);
});

const getDocument = catchAsync(async (req, res) => {
  const { cpf } = req.params;
  const imageDocuments = await registerService.cdn47getImages(cpf);
  res.status(httpStatus.OK).send(imageDocuments);
});

const getCpf = catchAsync(async (req, res) => {
  await registerService.getCpfIfExist(req.params.cpf);
  res.send();
});

const getRegisters = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await registerService.queryRegisters(filter, options);
  res.send(result);
});

const getRegistersEliminados = catchAsync(async (req, res) => {
  const data = await registerService.getInscritosEliminados();
  res.send(data);
});

const sendSms = catchAsync(async (req, res) => {
  await registerService.postSms();
  res.status(httpStatus.CREATED).json({ message: 'ok' });
});

module.exports = {
  createRegister,
  updateRegister,
  updateParcialRegister,
  getDocument,
  getRegisters,
  getRegistersEliminados,
  getCpf,
  sendSms,
  loginProtocolo,
};
