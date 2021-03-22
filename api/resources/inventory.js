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

