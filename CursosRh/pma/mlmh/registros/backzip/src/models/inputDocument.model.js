const mongoose = require('mongoose');

const inputDocumentSchema = mongoose.Schema(
  {
    tipo: { type: String, required: true, uppercase: true },
    label: { type: String, required: true },
  },
  { timestamps: true }
);

const InputDocument = mongoose.model('InputDocument', inputDocumentSchema);

module.exports = InputDocument;
