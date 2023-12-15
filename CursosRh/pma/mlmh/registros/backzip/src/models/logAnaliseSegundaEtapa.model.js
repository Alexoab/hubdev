const mongoose = require('mongoose');

const logAnaliseSegundaEtapaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    documentosIrregulares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InputDocument',
      },
    ],
    justificativa: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const LogAnaliseSegunaEtapa = mongoose.model('LogAnaliseSegundaEtapa', logAnaliseSegundaEtapaSchema);

module.exports = LogAnaliseSegunaEtapa;
