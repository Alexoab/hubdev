const mongoose = require('mongoose');

const logRecursoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    nameUser: { type: String },
    cpfUser: { type: String },
    recurso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recurso',
    },
    register: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
    },
    campo: {
      type: String,
    },
    valorAntigo: {
      type: String,
    },
    value: {
      type: String,
    },
    justificativa: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const LogRecurso = mongoose.model('LogRecurso', logRecursoSchema);

module.exports = LogRecurso;
