const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { registerService } = require('../services');

const typeStorage = process.env.NODE_ENV === 'production' ? 'cdn47' : 'local';

// UPLOAD DE IMAGEM
const storageTypes = {
  local: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { protocolo } = req.params;
      const { cpf } = await registerService.loginWithProtocol(protocolo);
      let cpfFormated = cpf;
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('-', '');

      const isvalidate = () => {
        const dir = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', cpfFormated);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          return dir;
        }
        return dir;
      };

      cb(null, isvalidate());
    },
    filename: async (req, file, cb) => {
      const { protocolo, tipo } = req.params;
      const { cpf } = await registerService.loginWithProtocol(protocolo);
      let cpfFormated = cpf;
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('-', '');

      if (file.mimetype === 'application/pdf') {
        cb(null, `${cpfFormated}-${Date.now()}-${tipo}.pdf`);
      }
      cb(null, `${cpfFormated}-${Date.now()}-${tipo}.jpeg`);
    },
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpg', 'image/gif', 'image/pjpeg', 'image/png', 'image/jpeg', 'application/pdf'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Arquivo com formato inválido'));
      }

      return cb(null, false);
    },
  }),
  cdn47: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { protocolo } = req.params;

      const { cpf } = await registerService.loginWithProtocol(protocolo);
      let cpfFormated = cpf;
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('-', '');

      const isvalidate = () => {
        const dir = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', cpfFormated);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          return dir;
        }
        return dir;
      };

      cb(null, isvalidate());
    },
    filename: async (req, file, cb) => {
      const { protocolo, tipo } = req.params;
      const { cpf } = await registerService.loginWithProtocol(protocolo);
      let cpfFormated = cpf;
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('.', '');
      cpfFormated = cpfFormated.replace('-', '');

      if (file.mimetype === 'application/pdf') {
        cb(null, `${cpfFormated}-${Date.now()}-${tipo}.pdf`);
      }
      cb(null, `${Date.now()}-${file.originalname.replace('.', '')}.jpeg`);
    },
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpg', 'image/gif', 'image/pjpeg', 'image/png', 'image/jpeg', 'application/pdf'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Arquivo com formato inválido'));
      }

      return cb(null, false);
    },
  }),
};

module.exports = {
  storage: storageTypes[`${typeStorage}`],
};
