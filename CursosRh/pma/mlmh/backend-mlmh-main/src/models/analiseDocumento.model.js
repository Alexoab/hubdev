const mongoose = require('mongoose');

const analiseDocumentoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    register: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
    },
    logAnalise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LogRecurso',
      },
    ],
    documentosIrregulares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InputDocument',
      },
    ],
    justificativa: { type: String },
    status: { type: String, default: 'Em aberto' },
  },
  { timestamps: true }
);

const AnaliseDocumeno = mongoose.model('AnaliseDocumeno', analiseDocumentoSchema);

module.exports = AnaliseDocumeno;
