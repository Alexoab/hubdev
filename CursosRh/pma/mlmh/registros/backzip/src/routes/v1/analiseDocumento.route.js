const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { analiseDocumentoValidation } = require('../../validations');
const { analiseDocumentoController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth('julgar'),
    validate(analiseDocumentoValidation.postAnaliseDocumento),
    analiseDocumentoController.postAnaliseDocumento
  )
  .get(
    auth('julgar'),
    validate(analiseDocumentoValidation.getAnaliseDocumento),
    analiseDocumentoController.getAnaliseDocumento
  )
  .put(
    auth('julgar'),
    validate(analiseDocumentoValidation.putAnaliseDocumento),
    analiseDocumentoController.putAnaliseDocumento
  );

router.get('/todasanalises', auth('julgar'), analiseDocumentoController.getAllAnaliseDocumento);
module.exports = router;
