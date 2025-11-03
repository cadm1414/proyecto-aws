require('dotenv').config();
const express = require('express');
//const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./src/docs/swagger.json');
const routes = require('./src/routes');
const { testConnection } = require('./src/config/sequelize');

const app = express();
const port = process.env.PORT || 3000;


//app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.use('/', routes);


const startServer = async () => {
  try {
    await testConnection();
    app.listen(port, () => {
      console.log(`✅ Server listening on port V2.5 ${port}`);
      console.log(`📚 API Docs: http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
