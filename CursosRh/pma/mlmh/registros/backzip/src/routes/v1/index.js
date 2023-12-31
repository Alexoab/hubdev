const express = require('express');
const authRoute = require('./auth.route');
const titleRoute = require('./title.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const registerRoute = require('./register.route');
const recursoRoute = require('./recurso.route');
const documentoRecursoRoute = require('./documentoRecurso.route');
const inputDocumentRoute = require('./inputDocument.route');
const analiseDocumentoRoute = require('./analiseDocumento.route');
const analiseSegundaEtapaDocumentoRoute = require('./analiseDocumentoSegundaEtapa');
const logs = require('./logs.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  { path: '/', route: titleRoute },
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/register', route: registerRoute },
  { path: '/recurso', route: recursoRoute },
  { path: '/documentoRecurso', route: documentoRecursoRoute },
  { path: '/inputdocument', route: inputDocumentRoute },
  { path: '/analiseDocumento', route: analiseDocumentoRoute },
  { path: '/analisesegundaetapadocumento', route: analiseSegundaEtapaDocumentoRoute },
  // { path: '/logs', route: logs },
];

const devRoutes = [
  // routes available only in development mode
  { path: '/docs', route: docsRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
