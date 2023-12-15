const mongoose = require('mongoose');

const analiseDocumentoSegundaEtapaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    register: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
    },
    logAnaliseSegundaEtapa: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LogAnaliseSegundaEtapa',
      },
    ],
    documentosIrregulares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InputDocument',
      },
    ],
    justificativa: { type: String },
    status: { type: String, default: 'Em analise' },
  },
  { timestamps: true }
);

const AnaliseDocumentoSegundaEtapa = mongoose.model('analiseDocumentoSegundaEtapa', analiseDocumentoSegundaEtapaSchema);

module.exports = AnaliseDocumentoSegundaEtapa;
