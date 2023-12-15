console.clear()
const registro = {
  _id: {
    $oid: "62f183483ad93776a265f8dd",
  },
  nome: "NEY FERREIRA DOS SANTOS",
  email: "neyfsantos@gmail.com",
  cpf: "381.625.391-15",
  rg: "777633",
  uf_rg: "DF",
  dt_nascimento: {
    $date: {
      $numberLong: "-994780800000",
    },
  },
  fone_celular: "(61)9-9333-0202",
  fone_fixo: "(61)9933-3020",
  sexo: "MASCULINO",
  portador_pcd: "nao",
  estado_civil: "casado",
  nacionalidade: "brasileiro",
  cep: "71996-225",
  logradouro: "SHA CONJUNTO 6 CHÁCARA 26",
  quadra: "33",
  lote: "10",
  complemento: "CONDOMINIO PAINEIRAS",
  bairro: "Setor Habitacional Arniqueira (Águas Claras)",
  localidade: "Brasília",
  uf: "DF",
  reside_ano: "10",
  renda_bruta: "R$50000,35",
  cadunico: "nao",
  possui_imovel: "nao",
  contemplado_habitacional: "nao",
  comprador_imovel: "nao",
  arrimo_familia: "sim",
  vitima_violencia: "sim",
  grupo_familiar: "sim",
  integrantes: [
    {
      integrante: 1,
      gf_nome: "jaquelina de nascimento",
      gf_dt_nascimento: "12/12/2006",
      gf_cpf: "558.139.370-21",
      gf_rg_certidao: "",
      gf_pcd: "nao",
      gf_parentesco: "Filho/Filha",
      _id: {
        $oid: "62f183483ad93776a265f8de",
      },
    },

    {
      integrante: 2,
      gf_nome: "Jurema Da Silva",
      gf_dt_nascimento: "12/12/2018",
      gf_cpf: "558.139.370-22",
      gf_rg_certidao: "",
      gf_pcd: "nao",
      gf_parentesco: "Filho/Filha",
      _id: {
        $oid: "62f183483ad93776a265f8de",
      },
    },

    {
      integrante: 3,
      gf_nome: "Jeca Tatu",
      gf_dt_nascimento: "04/11/1961",
      gf_cpf: "558.139.370-21",
      gf_rg_certidao: "",
      gf_pcd: "nao",
      gf_parentesco: "Filho/Filha",
      _id: {
        $oid: "62f183483ad93776a265f8de",
      },
    },
  ],
  protocolo: "080932AA005",
  sent_protocol: false,
  deletado: false,
  createdAt: {
    $date: {
      $numberLong: "1659994952785",
    },
  },
  updatedAt: {
    $date: {
      $numberLong: "1666565215566",
    },
  },
  __v: 1,
  numero_cadunico: "",
  recurso: [],
};

console.log('-----------------------------------------------------------------------------------------')

const pontuarRendaPerCapta = ({ renda_bruta, integrantes }) => {
  const rendaBrutaEmReais = renda_bruta.replace(/\D/g, "") / 100;


  const rendaPerCapta = rendaBrutaEmReais / (integrantes.length + 1);
  let pontos;
  if (rendaPerCapta <= 1302) {
    pontos = 5;
  } else if (rendaPerCapta <= 651) {
    pontos = 10;
  } else {
    pontos = 0;
  }

  console.log(`Renda PerCapta: ${rendaPerCapta}`)
  return pontos;
};

let pontosRendas = pontuarRendaPerCapta(registro);

console.log(`Pontos Renda Per capta: ${pontosRendas}`)

console.log('--------------------------------------------------------------------------------------')


// -------------------------------------------------RENDA IDOSOS-------------------------------------


const pontuarIdosoGrupoFamiliar = ({ dt_nascimento: { $date: { $numberLong: dataNascCandidato } }, createdAt: { $date: { $numberLong: dataCadastro } }, integrantes }) => {


  dataNascCandidato = new Date(parseInt(dataNascCandidato));

  dataCadastro = new Date(parseInt(dataCadastro))

  let diferencaCandidato = dataCadastro.getTime() - dataNascCandidato.getTime();
  let anosCandiato = Math.floor(diferencaCandidato / (365.25 * 24 * 60 * 60 * 1000));

  console.log('O candidato tem: ' + anosCandiato + ' anos.');

  let flag = 0;
  let pontosIdosos = 0
  if (anosCandiato >= 60) {

    flag = 1;
  }

  let i = 0;
  let j = 0;
  let dataNascIntegrantes = [];
  let anoNascIntegrantes = [];



  while (integrantes[i]) {
    dataNascIntegrantes.push(integrantes[i].gf_dt_nascimento);



    dataNascIntegrantes[i] = ((dataNascIntegrantes[i].split('/')));
    anoNascIntegrantes.push(dataNascIntegrantes[i][2]);
    anoNascIntegrantes = anoNascIntegrantes.map(Number);


    anoNascIntegrantes = anoNascIntegrantes.filter((value) => {
      return value <= 1962
    })

    i++;
  }

  if (anosCandiato >= 60) {
    console.log(`Contando com o candidato existe(m) ${flag + anoNascIntegrantes.length} integrante(s) idósos no grupo familiar.`)

  } else {
    console.log(`Existe(m) ${flag + anoNascIntegrantes.length} integrante(s) idósos no grupo familiar.`)
  }


  if (flag == 0 && anoNascIntegrantes.length == 0) {

    pontosIdosos = 0;
    return pontosIdosos;

  } else if (flag == 0 && anoNascIntegrantes.length == 1) {

    pontosIdosos = 3;
    return pontosIdosos;

  } else if (flag == 1 && anoNascIntegrantes.length == 0) {

    pontosIdosos = 3;
    return pontosIdosos;

  } else if (flag == 1 && anoNascIntegrantes.length > 0) {

    pontosIdosos = 5;
    return pontosIdosos;
  }
  else if (flag == 0 && anoNascIntegrantes.length > 1) {
    pontosIdosos = 5;
    return pontosIdosos;
  }
};

let pontosIdosos = pontuarIdosoGrupoFamiliar(registro);
console.log(`Pontos Pessoas Idosas: ${pontosIdosos}`);

console.log("----------------------------------------------------------------------------------")


// ---------------------------------------Pontos Crianças--------------------------------------

const pontuarCriancasGrupoFamiliar = ({ integrantes }) => {

  let flag = 0;
  let i = 0;
  let x = 0;
  let pontoCriancas = 0;
  let criancas = [];
  let anoNasCriancas = [];

  if (integrantes.length > 0) {

    while (integrantes[i]) {

      criancas.push(integrantes[i].gf_dt_nascimento)
      criancas[i] = criancas[i].split('/');
      anoNasCriancas.push(criancas[i][2]);
      anoNasCriancas = anoNasCriancas.map(Number)
      i++;

    }

    while (anoNasCriancas[x]) {

      if (anoNasCriancas[x] >= 2005) {
        flag = flag + 1;
      }
      x++;
    }

    console.log(`Existe(m) ${flag} crianças ou adolescente(s) no grupo familiar.`)



    if (flag > 1) {
      pontoCriancas = 5;
      return pontoCriancas;

    } else if (flag == 1) {
      pontoCriancas = 3;
      return pontoCriancas;
    }

  } else {

    console.log('Não há crianças ou adolescentes no grupo familiar')
    pontoCriancas = 0;
    return pontoCriancas;
  }

};

let pontosCriancas = pontuarCriancasGrupoFamiliar(registro);
console.log(` Pontução crianças :  ${pontosCriancas} `);



console.log('------------------------------------------------------------------------------------')

//---------------------------------------Deficiente Familiar--------------------------------------

const pontuarDeficienteFamiliar = ({ integrantes, portador_pcd }) => {

  let i = 0;
  let pontosPortadorDeficiencia = 0
  let vetPcd = [];

  if (portador_pcd == 'sim') {
    vetPcd.push(portador_pcd);


  } else {
    console.log("O candidato não é PCD");
  }


  while (integrantes[i]) {


    if (integrantes[i].gf_pcd == 'sim') {
      vetPcd.push(portador_pcd);
    }
    i++;
  }
  if (vetPcd.length >= 1) {
    pontosPortadorDeficiencia = 5;

    console.log(`Existe(m) ${vetPcd.length} pessoas portadoras de deficiência no grupo familiar `);
    return pontosPortadorDeficiencia;

  } else {
    console.log('Não há pessoas portadoras de deficiêcia no grupo familiar ')
    pontosPortadorDeficiencia = 0;
    return pontosPortadorDeficiencia;
  }

};

let pontosPcd = pontuarDeficienteFamiliar(registro);

console.log(`Pontuação pessoas portadoras de deficiência física: ${pontosPcd}`)


console.log('------------------------------------------------------------------------------------')

//-----------------------------Grupo familiar composto por 4 ou mais membros--------------------------------------

const pontuarQuantidadeFamiliar = ({ integrantes }) => {
  let numeroIntegrantes = 0;
  let pontosIntegrantes = 0;
  let i = 1;

  if (integrantes.length > 0) {

    while (integrantes[i]) {
      i++
    }
    numeroIntegrantes = (i + 1);

    if (numeroIntegrantes >= 4) {
      console.log(`Grupo familiar composto por ${numeroIntegrantes} integrantes`)
      pontosIntegrantes = 5;
      return pontosIntegrantes;

    } else {
      console.log(`Grupo familiar composto por apenas  ${numeroIntegrantes} integrantes.`)
      pontosIntegrantes = 0;
      return pontosIntegrantes;
    }

  } else {
    pontosIntegrantes = 0;
    console.log("Não há integrantes fora o candidato no grupo familiar");
    return pontosIntegrantes;
  };

}

let pontosGrupoFamiliar = pontuarQuantidadeFamiliar(registro);
console.log(`Pontuação Grupo familiar ${pontosGrupoFamiliar} pontos`)


console.log('-----------------------------------------------------------------------------------------')
// ------------------------------------------Mulher Arrimo------------------------------------------------

const pontuarArrimo = ({ arrimo_familia, sexo }) => {

  let pontosMulherArrimo = 0;

  if (sexo == 'FEMININO') {
    if (arrimo_familia == 'sim') {
      console.log(`Mulher arrimo de família: ${arrimo_familia} `);
      pontosMulherArrimo = 3;
      return pontosMulherArrimo;

    } else {
      console.log(`Mulher arrimo de família: ${arrimo_familia} `);
      pontosMulherArrimo = 0;
      return pontosMulherArrimo;
    }
  } else {
    console.log('Sexo masculino não tem direito a essa pontuação');
    pontosMulherArrimo = 0;
    return pontosMulherArrimo;
  }

}






const pontuacaoMulherarrimo = pontuarArrimo(registro);
console.log(`Pontuação mulher arrimo ${pontuacaoMulherarrimo} pontos`)


console.log('-----------------------------------------------------------------------------------------')
// --------------------------   Mulher Vítma de violência doméstica-----------------------------------------

const pontuarVitima = ({ vitima_violencia, sexo }) => {

  pontosViolencia = 0;
  if (sexo == 'FEMININO') {
    if (vitima_violencia == 'sim') {
      console.log(`Mulher vítima de violência doméstica: ${vitima_violencia} `);
      pontosViolencia = 5;
      return pontosViolencia;

    } else {
      console.log(`Mulher vítima de violência doméstica: ${vitima_violencia} `);
      pontosViolencia = 0;
      return pontosViolencia;
    }
  } else {
    console.log('Sexo masculino não tem direito a essa pontuação');
    pontosViolencia = 0;
    return pontosViolencia;
  }
};

const pontuacaovitima = pontuarVitima(registro);
console.log(` %c Pontuação mulher vítima de violência doméstica ${pontuacaovitima} pontos`, 'color:#fff')

console.log('-----------------------------------------------------------------------------------------')

//--------------------------------------------TOTAL DE PONTOS-----------------------------------------

const totalPontos = (pontosIdosos + pontosCriancas + pontosPcd + pontosGrupoFamiliar + pontuacaoMulherarrimo + pontuacaovitima)
console.log(`Toatal de Pontos: ${totalPontos}`)

console.log('-----------------------------------------------------------------------------------------')
