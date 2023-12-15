const mongoose = require('mongoose');

const logAnaliseSchema = mongoose.Schema(
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

const LogAnalise = mongoose.model('LogAnalise', logAnaliseSchema);

module.exports = LogAnalise;
