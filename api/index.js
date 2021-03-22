var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//  Add swagger UI
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger/swagger.json');

//  Get Environment Variables
var prefix = process.env.PREFIX;
var swaggerUrl = process.env.SWAGGER_SERVER_URL;

console.info('Retrieving Prefix: ', prefix);
console.info('Retrieving Swagger URL: ', swaggerUrl);

prefix = (!prefix ? '' : prefix);
swaggerUrl = (!swaggerUrl ? 'http://localhost:3000' : swaggerUrl);

console.info('Final Prefix: ', prefix);
console.info('Final Swagger URL: ', swaggerUrl);

console.info('Setting Swagger Server URL');
swaggerDocument.servers = [{'url': swaggerUrl}];

app.use(`${prefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//  Add Inventory Management Endpoints
var inventory = require('./resources/inventory.js');

app.use(`${prefix}/inventory`, inventory);


app.listen(3000);
