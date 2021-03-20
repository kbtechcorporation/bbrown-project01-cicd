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

//  Add Inventory Management Endpoints
var inventory = require('./resources/inventory.js');

app.use('/inventory', inventory);

//  Add swagger UI
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger/swagger.json');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000);
