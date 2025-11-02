const express = require('express');
const router = express.Router();

// Importar subrutas
const infoRoutes = require('./info.routes');
const versionRoutes = require('./version.routes');
const userRoutes = require('./user.routes');

// Rutas base
router.get('/', (req, res) => res.send('Hola desde proyecto final V2.5!'));
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Subrutas
router.use('/api/info', infoRoutes);
router.use('/api/version', versionRoutes);
router.use('/api/users', userRoutes);

module.exports = router;