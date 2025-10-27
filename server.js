const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req,res) => res.send('Hola desde proyecto final!'));
app.get('/health', (req,res) => res.json({status:'ok'}));
app.get('/api/info', (req,res) => res.json({name:'proyecto_final', env: process.env.NODE_ENV || 'dev'}));
app.get('/api/version', (req,res) => res.json({version:'1.0.0', updated: new Date().toISOString()}));

app.listen(port, () => console.log(`Server listening on port ${port}`));