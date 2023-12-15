const mongoose = require('mongoose');

const documentUploadSchema = mongoose.Schema(
  {
    idRegister: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
    },
    application: { type: String, required: true },
    tipo: { type: String, required: true },
    cpf: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const DocumentUpload = mongoose.model('DocumentUpload', documentUploadSchema);

module.exports = DocumentUpload;
