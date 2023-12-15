const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { analiseDocumentoSegundaEtapaValidation } = require('../../validations');
const { analiseDocumentoSegundaEtapaController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(
    auth('julgar'),
    validate(analiseDocumentoSegundaEtapaValidation.getAnaliseDocumentoSegundaEtapa),
    analiseDocumentoSegundaEtapaController.getAnaliseSegundaEtapaDocumento
  )
  .post(
    auth('julgar'),
    validate(analiseDocumentoSegundaEtapaValidation.postAnaliseSegundaEtapaDocumento),
    analiseDocumentoSegundaEtapaController.postAnaliseSegundaEtapaDocumento
  )
  .put(
    auth('julgar'),
    validate(analiseDocumentoSegundaEtapaValidation.putAnaliseDocumentoSegundaEtapa),
    analiseDocumentoSegundaEtapaController.putAnaliseSegundaEtapaDocumento
  );

router.get('/todasanalises', auth('julgar'), analiseDocumentoSegundaEtapaController.getAllAnaliseSegundaEtapaDocumento);

module.exports = router;
