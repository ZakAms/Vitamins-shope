"use strict";
var express     = require('express'),
    bodyParser  = require('body-parser'),
    fs          = require('fs'),
    app         = express(),
    products   = JSON.parse(fs.readFileSync('data/products.json', 'utf-8')),
    inContainer = process.env.CONTAINER,
    inAzure = process.env.WEBSITE_RESOURCE_GROUP,
    port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

//The dist folder has our static resources (index.html, css, images)
if (!inContainer) {
    app.use(express.static(__dirname + '/dist'));
    console.log(__dirname);
}


app.get('/api/products/page/:skip/:top', (req, res) => {
  const topVal = req.params.top,
        skipVal = req.params.skip,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;
  let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

  if (top > products.length) {
      top = skip + (products.length - skip);
  }

  console.log(`Skip: ${skip} Top: ${top}`);

  var pagedProducts = products.slice(skip, top);
  res.setHeader('X-InlineCount', products.length);
  res.json(pagedProducts);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  let productId = +req.params.id;
  let selectedProduct = null;
  for (let product of products) {
      if (product.productId === productId) {
          selectedProduct = {};
         selectedProduct = product;
         break;
      }
  }
  res.json(selectedProduct);
});


app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

if (!inContainer) {
    // redirect all others to the index (HTML5 history)
    app.all('/*', function(req, res) {
        res.sendFile(__dirname + '/dist/index.html');
    });
}

app.listen(port);

console.log('Express listening on port ' + port);

//Open browser
if (!inContainer && !inAzure) {
    var opn = require('opn');

    opn('http://localhost:' + port).then(() => {
        console.log('Browser closed.');
    });
}


