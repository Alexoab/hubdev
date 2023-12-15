const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { inputDocumentValidation } = require('../../validations');
const { inputDocumentController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth('criarValorInput'),
    validate(inputDocumentValidation.postInputDocument),
    inputDocumentController.postInputDocument
  )
  .get(validate(inputDocumentValidation.getAllInputDocument), inputDocumentController.getAllInputDocument)
  .delete(
    auth('criarValorInput'),
    validate(inputDocumentValidation.deleteInputDocument),
    inputDocumentController.deleteInputDocument
  );

module.exports = router;
