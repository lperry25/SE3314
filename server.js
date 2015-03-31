var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://danicamcleod:turtles1@ds053419.mongolab.com:53419/stockmarket'); // connect to database

var app = express();

var logger = require('./logger');
app.use(logger);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var buyOrderSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number,
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'companySchema'}
});

var saleOrderSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number,
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'companySchema'}
});

var companySchema = mongoose.Schema({
    name: String,
    symbolURL: String,
    openPrice: String,
    currentPrice: {type: Number, default: 0.0},
    changeValue: {type: Number, default: 0.0},
    changeIcon: {type: String, default:'images/noChange.png'},
    changePercentage: {type: Number, default: 0.0},
    changeDirection: {type: Number, default: 0.0},
    shareVolume: {type: Number, default: 0.0},
    buyOrders: [buyOrderSchema],
    saleOrders: [saleOrderSchema],
    transactions: [transactionSchema]
});

var transactionSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number,
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'companySchema'}
});

var BuyOrders = mongoose.model('BuyOrders', buyOrderSchema);
var SaleOrders = mongoose.model('SaleOrders', saleOrderSchema);
var Companies = mongoose.model('Companies', companySchema);
var Transactions = mongoose.model('Transactions', transactionSchema);

app.get('/companies', function (request, response) {
    Companies.find(function (error, companies) {
        if (error) response.send(error);
        response.json({companies: companies});
    });
});

app.get('/buyOrders', function (request, response) {
    BuyOrders.find(function (error, buyOrders) {
        if (error) response.send(error);
        response.json({buyOrders: buyOrders});
    });
});

app.get('/saleOrders', function (request, response) {
    SaleOrders.find(function (error, saleOrders) {
        if (error) response.send(error);
        response.json({saleOrders: saleOrders});
    });
});

app.post('/companies', function (request, response) {
    var company = new Companies({
        // TO DO
    });
    company.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({companies: company});
    });
});

app.post('/buyOrders', function (request, response) {
    var buyOrder = new BuyOrders({
        // TO DO
    });
    buyOrder.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({buyOrders: buyOrder});
    });
});

app.post('/saleOrders', function (request, response) {
    var saleOrder = new SaleOrders({
        // TO DO
    });
    saleOrder.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({saleOrders: saleOrder});
    });
});

app.post('/transactions', function (request, response) {
    var transaction = new Transactions({
        // TO DO
    });
    transaction.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({transactions: transaction});
    });
});

app.put('/companies/:company_id', function (request, response) {
    Companies.findById(request.params.company_id, function (error, company) {
        if (error) response.send(error);

        // TO DO - update the company info 

        // save the company
        company.save(function (error) {
            if (error) response.send(error);
            response.status(201).json({companies: company});
        });
    });
});

app.delete('/buyOrders/:buyOrder_id', function (request, response) {
    BuyOrders.remove({
        _id: request.params.buyOrder_id
    }, function(error, buyOrder) {
        if (error) response.send(err);
        response.status(201).json({buyOrders: BuyOrders});
    });

});

app.delete('/saleOrders/:saleOrder_id', function (request, response) {
    Posts.remove({
        _id: request.params.saleOrder_id
    }, function(error, saleOrder) {
        if (error) response.send(err);
        response.status(201).json({saleOrders: SaleOrders});
    });

});

app.listen(3700, function () {
    console.log('Listening on port 3700');
});