const swaggerUi = require('swagger-ui-express');
const openApiSpec = require('../docs/openapi.json');

function setupSwagger(app) {
  const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Sales System API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true
    }
  };

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, options));
}

module.exports = { setupSwagger };
