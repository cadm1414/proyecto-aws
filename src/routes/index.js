const express = require('express');
const router = express.Router();

// Importar subrutas
const infoRoutes = require('./info.routes');
const versionRoutes = require('./version.routes');

// Rutas base
router.get('/', (req, res) => res.send('Hola desde proyecto final V2.3!'));
//router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Subrutas
router.use('/api/info', infoRoutes);
router.use('/api/version', versionRoutes);

module.exports = router;