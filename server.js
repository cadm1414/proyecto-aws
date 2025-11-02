const express = require('express');
//const cors = require('cors');
//const swaggerUi = require('swagger-ui-express');
//const swaggerDoc = require('./src/docs/swagger.json');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

//app.use(cors());
app.use(express.json());

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/', routes);
app.listen(port, () => console.log(`✅ Server listening on port V2.3 ${port}`));
