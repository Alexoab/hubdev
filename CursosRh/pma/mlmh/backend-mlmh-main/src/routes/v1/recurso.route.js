const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const { recursoValidation } = require('../../validations');
const { recursoController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(recursoValidation.createRecurso), recursoController.createRecurso)
  .get(validate(recursoValidation.getRecurso), recursoController.getRecurso)
  .put(validate(recursoValidation.updateRecurso), recursoController.updateRecurso);
router.route('/getRecurso/:protocolo').get(validate(recursoValidation.getRecurso), recursoController.getRecurso);

// Rotas admin
router.get('/todosRecursos', auth('julgar'), recursoController.adminGetTodosRecursos);
router.patch(
  '/atualizarRecurso',
  auth('julgar'),
  validate(recursoValidation.adminUpdateRecurso),
  recursoController.adminUpdateRecurso
);

router.patch(
  '/atualizarRegistro',
  auth('julgar'),
  validate(recursoValidation.adminUpdateRegistro),
  recursoController.adminUpdateRegistro
);

module.exports = router;
