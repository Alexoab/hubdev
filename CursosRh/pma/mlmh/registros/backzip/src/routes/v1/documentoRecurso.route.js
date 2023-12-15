const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { documentoRecursoValidation } = require('../../validations');
const { documentoRecursoController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(documentoRecursoValidation.createDocumentoRecurso), documentoRecursoController.createDocumentoRecurso)
  .put(validate(documentoRecursoValidation.deleteDocumentoRecurso), documentoRecursoController.deleteDocumentoRecurso);

router
  .route('/getAllDocuments/:protocolo')
  .get(
    validate(documentoRecursoValidation.getTodosDocumentosRecurso),
    documentoRecursoController.getTodosDocumentosRecurso
  );
router.get('/todosDocumentos', auth('julgar'), documentoRecursoController.adminGetTodosDocuementos);

module.exports = router;
