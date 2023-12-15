const mongoose = require('mongoose');

const recursoSchema = mongoose.Schema(
  {
    register: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
    },
    logRecurso: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LogRecurso',
      },
    ],
    etapa: { type: String, required: true },
    justificativa: { type: String },
    status: { type: String, default: 'Em aberto' },
    recurso: { type: String },
  },
  { timestamps: true }
);

const Recurso = mongoose.model('Recurso', recursoSchema);

module.exports = Recurso;
