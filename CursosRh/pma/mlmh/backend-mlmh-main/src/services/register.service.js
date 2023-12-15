const httpStatus = require('http-status');

const { Register, Log } = require('../models');
const ApiError = require('../utils/ApiError');
const { sendSmsMult } = require('./sms.service');
const { gerarProtocolo } = require('../utils/functions');

// Create a register
const createRegister = async (registerBody) => {
  registerBody.integrantes.forEach((item) => {
    if (item.gf_cpf === registerBody.cpf) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'CPF duplicado!');
    }
  });

  const cpfExist = await Register.findOne({ cpf: registerBody.cpf });
  if (cpfExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
  const cpfExistParente = await Register.find({
    'integrantes.gf_cpf': registerBody.cpf,
  });
  if (cpfExistParente[0]) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
  // eslint-disable-next-line no-param-reassign
  registerBody.protocolo = gerarProtocolo();
  return Register.create(registerBody);
};
// testando codigo
// Query for registers
const queryRegisters = async (filter, options) => {
  const registers = await Register.paginate(filter, options);
  return registers;
};

const getCpfIfExist = async (cpf) => {
  const cpfExist = await Register.findOne({ cpf });
  if (cpfExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
  const cpfExistParente = await Register.find({ 'integrantes.gf_cpf': cpf });
  if (cpfExistParente[0]) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
};

const loginWithProtocol = async (protocolo) => {
  const registerEncontrado = await Register.findOne({ protocolo });
  if (!registerEncontrado) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Protocolo não encontrado');
  }
  return registerEncontrado;
};

// Get Register by cpf
const getRegisterByCpf = async (cpf) => {
  return Register.find({ cpf });
};

const postSms = async () => {
  await Register.find({}, '_id nome fone_celular protocolo').then((registers) => {
    const arrRegister = [];

    Promise.all(
      registers.map(async (item) => {
        arrRegister.push({
          to: `55${item.fone_celular.replace(/[^\d]+/g, '')}`,
          msg: `Olá, ${item.nome},
          Seu cadastro foi realizado com sucesso, esse é o número do seu Protocolo: ${item.protocolo}`,
        });
        await Log.create({
          telefone: item.fone_celular,
          protocolo: item.protocolo,
          sent_sms: true,
        });
      })
    );
    sendSmsMult(arrRegister);
  });
};

const getInscritosEliminados = async () => {
  const register = await Register.find(
    {},
    '_id reside_ano dt_nascimento renda_bruta possui_imovel comprador_imovel contemplado_habitacional'
  );

  function getAge(DOB) {
    const today = new Date();
    const birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  }

  const EliminadosComprador = register.filter((item) => item.comprador_imovel === 'sim');
  const contempladoHabitacional = register.filter((item) => item.contemplado_habitacional === 'sim');
  const possuiImovel = register.filter((item) => item.possui_imovel === 'sim');
  const resideAno = register.filter((item) => Number(item.reside_ano) < 5);
  const dtNascimento = register.filter((item) => getAge(item.dt_nascimento) < 18);
  const rendaBrutaUnica = register.filter(
    (item) => Number(item.renda_bruta.replace('R$', '').replace('.', '').replace(',', '.')) > 1818
  );

  const EliminadosTotal = register.filter(
    (item) =>
      item.comprador_imovel === 'sim' ||
      item.contemplado_habitacional === 'sim' ||
      item.possui_imovel === 'sim' ||
      Number(item.reside_ano) < 5 ||
      getAge(item.dt_nascimento) < 18 ||
      Number(item.renda_bruta.replace('R$', '').replace('.', '').replace(',', '.')) > 1818
  );

  const data = {
    dt_nascimento: dtNascimento.length,
    rendaBrutaUnica: rendaBrutaUnica.length,
    contempladoHabitacional: contempladoHabitacional.length,
    possuiImovelEHabitacional: possuiImovel.length + EliminadosComprador.length,
    resideAno: resideAno.length,
    totalInscritos: register.length,
    totalEliminados: EliminadosTotal.length,
  };

  return data;
};

const getZapAndProtocol = async () => {
  // const register = await Register.find({}, '_id fone_celular protocolo sent_protocol');
  // const idRegister = register.map((item) => item._id);
  // register.forEach((item) => {
  //   if (!item.sent_protocol) {
  //     const zapSent = createWriteTxtProtocol(register);
  //     if (zapSent) {
  //       idRegister.forEach(async (id) => {
  //         await Register.findByIdAndUpdate({ _id: id }, { sent_protocol: true }, { new: true })
  //           .then((response) => {
  //             return response;
  //           })
  //           .catch((e) => {
  //             throw new ApiError(httpStatus.BAD_REQUEST, e);
  //           });
  //       });
  //     }
  //   }
  // });
};

const updateRegisterService = async (updateBody) => {
  const user = await Register.findOne({ protocolo: updateBody.protocolo });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

// const uploadDocument = async (protocolo, tipo, file) => {
//   const { _id } = await Register.findOne({ protocolo });
//   if (file.mimetype === 'application/pdf') {
//     const documents = {
//       register: _id,
//       tipo,
//       filename: file.filename,
//     };
//     await DocumentUpload.create(documents);
//   } else {
//     const filename = await utils.compressImage(file, 1000);
//     const document = {
//       register: _id,
//       tipo,
//       filename,
//     };
//     await DocumentUpload.create(document);
//   }
// };

module.exports = {
  createRegister,
  queryRegisters,
  getRegisterByCpf,
  // cdn47getImages,
  // uploadDocument,
  getCpfIfExist,
  getZapAndProtocol,
  getInscritosEliminados,
  postSms,
  loginWithProtocol,
  updateRegisterService,
};
