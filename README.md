# Project 01 - Source Code

### Create Project & Application
----


#### api/index.js

```JavaScript
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

```

<br />

#### api/models/item.js

```JavaScript
class Item {
    constructor() {
        this.id = 0;
        this.name = '';
        this.quantity = 0;
        this.status = 'out';
    }
}
module.exports = Item;

```

<br />

#### api/resources/inventory.js

```JavaScript
var express = require('express');
var Item = require('../models/item.js');
var router = express.Router();
var items = [new Item(), new Item()];

items[0].id = 100;
items[0].name = 'Envelopes';
items[0].quantity = 100;
items[0].status = 'available';

items[1].id = 101;
items[1].name = 'Pens';
items[1].quantity = 25;
items[1].status = 'available';

module.exports = router;

router.get('/', function(req, res) {
    res.json(items);
});



```

<br />

#### api/swagger/swagger.json

```JSON
{
    "openapi": "3.0.1",
    "info": {
      "title": "BBrown Project 01 - Inventory Manager",
      "description": "This is a RESTful API for managing inventory.",
      "termsOfService": "http://swagger.io/terms/",
      "contact": {
        "email": "bbrown.caltech@gmail.com"
      },
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      },
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:3000"
      }
    ],
    "tags": [
      {
        "name": "inventory",
        "description": "Access inventory management resources"
      }
    ],
    "paths": {
      "/inventory": {
        "put": {
          "tags": [
            "inventory"
          ],
          "summary": "Update an existing inventory record",
          "operationId": "updateInventory",
          "requestBody": {
            "description": "Inventory item that needs to be updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Item"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Item"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Item updated",
              "content": {
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Item"
                  }
                },
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Item"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied",
              "content": {}
            },
            "404": {
              "description": "Pet not found",
              "content": {}
            },
            "405": {
              "description": "Validation exception",
              "content": {}
            }
          },
          "x-codegen-request-body-name": "body"
        },
        "post": {
          "tags": [
            "inventory"
          ],
          "summary": "Add a new inventory record",
          "operationId": "addInventory",
          "requestBody": {
            "description": "Inventory item that needs to be added",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Item"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Item"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Item created",
              "content": {
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Item"
                  }
                },
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Item"
                  }
                }
              }
            },
            "405": {
              "description": "Invalid input",
              "content": {}
            }
          },
          "x-codegen-request-body-name": "body"
        },
        "get": {
          "tags": [
            "inventory"
          ],
          "summary": "Return all items in inventory",
          "operationId": "getInventory",
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/xml": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Item"
                    }
                  }
                },
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Item"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/inventory/{inventoryId}": {
        "get": {
          "tags": [
            "inventory"
          ],
          "summary": "Find inventory item by ID",
          "description": "Returns a single inventory item",
          "operationId": "getInventoryId",
          "parameters": [
            {
              "name": "inventoryId",
              "in": "path",
              "description": "ID of inventory item to return",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int64"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Item"
                  }
                },
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Item"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied",
              "content": {}
            },
            "404": {
              "description": "Item not found",
              "content": {}
            }
          }
        },
        "delete": {
          "tags": [
            "inventory"
          ],
          "summary": "Deletes an inventory item",
          "operationId": "deleteInventory",
          "parameters": [
            {
              "name": "inventoryId",
              "in": "path",
              "description": "Inventory id to delete",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int64"
              }
            }
          ],
          "responses": {
            "400": {
              "description": "Invalid ID supplied",
              "content": {}
            },
            "404": {
              "description": "Inventory item not found",
              "content": {}
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Item": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            },
            "name": {
              "type": "string"
            },
            "quantity": {
              "type": "integer",
              "format": "int32"
            },
            "status": {
              "type": "string",
              "description": "Inventory Status",
              "enum": [
                "available",
                "out",
                "ordered"
              ]
            }
          },
          "xml": {
            "name": "Item"
          }
        }
      }
    }
  }

```

<br />

#### api/Express.API.Dockerfile

```Dockerfile
######################################################################################################################################
#   Author: BBrown
#   Date: 03/20/2021
#   Description: Serves as the default build image
######################################################################################################################################
FROM ubuntu

EXPOSE 3000

USER root

#   INSTALL NODE
RUN apt-get update -y
RUN apt-get install -y nodejs
RUN apt-get install -y npm

#   CREATE APPLICATION USER & GROUP
RUN groupadd docker
RUN useradd -m expressapi -G docker
RUN usermod -g docker root

#   CREATE APPLICATION DIRECTORY
RUN mkdir -p /app

#   COPY APPLICATION FILES
COPY ./models /app/models
COPY ./resources /app/resources
COPY ./swagger /app/swagger
COPY ./index.js /app/index.js
COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json

#   SET WORKING DIRECTORY & INSTALL APPLICATION DEPENDENCIES
WORKDIR /app
RUN npm install --prefix /app

#   CHANGE APPLICATION DIRECTORY OWNER
RUN chown -R expressapi:docker /app

#   SET USER
USER expressapi

ENTRYPOINT [ "node", "/app/index.js" ]

```