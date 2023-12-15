const mongoose = require('mongoose');

const documentoRecursoSchema = mongoose.Schema(
  {
    register: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Register',
    },
    recurso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recurso',
    },
    pathFile: { type: String, required: true },
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const DocumentoRecurso = mongoose.model('DocumentoRecurso', documentoRecursoSchema);

module.exports = DocumentoRecurso;
