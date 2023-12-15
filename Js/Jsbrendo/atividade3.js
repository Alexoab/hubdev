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
      $numberLong: "-94780800000",
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
  renda_bruta: "R$500,00",
  cadunico: "nao",
  possui_imovel: "nao",
  contemplado_habitacional: "nao",
  comprador_imovel: "nao",
  arrimo_familia: "nao",
  vitima_violencia: "nao",
  grupo_familiar: "sim",
  integrantes: [
    {
      integrante: 1,
      gf_nome: "jaquelina de nascimento",
      gf_dt_nascimento: "12/12/1993",
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

const { nome, cpf } = registro;

const pontuarRendaPerCapta = ({ renda_bruta, integrantes }) => {
  const rendaBrutaEmReais = renda_bruta.replace(/\D/g, "") / 100;

  const rendaPerCapta = rendaBrutaEmReais / (integrantes.length + 1);
  let pontos;
  if (rendaPerCapta <= 1302) {
    pontos = 5;
  }
  if (rendaPerCapta <= 651) {
    pontos = 10;
  }

  return pontos;
};

const pontuarIdosoGrupoFamiliar = (registro) => {};
const pontuarCriancasGrupoFamiliar = (registro) => {};
const pontuarDeficienteFamiliar = (registro) => {};
const pontuarQuantidadeFamiliar = (registro) => {};
const pontuarArrimo = (registro) => {};
const pontuarVitima = (registro) => {};

const pontuacaoTotal =
  pontuarIdosoGrupoFamiliar(registro) + pontuarCriancasGrupoFamiliar(registro);

console.log(typeof pontuarRendaPerCapta(registro));
