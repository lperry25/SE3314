var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/stockmarket');
//using mongoLab, so internet connection is needed
mongoose.connect('mongodb://lauramperry.12:password93@ds059651.mongolab.com:59651/stockmarket');
console.log("test");
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

//all the get's can happen outside a semaphore, because it does not need to be synchronized
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
        name: request.body.company.name,
        symbolURL: request.body.company.symbolURL,
        openPrice: request.body.company.openPrice,
        currentPrice: request.body.company.currentPrice,
        changeValue: request.body.company.changeValue,
        changeIcon: request.body.company.changeIcon,
        changePercentage: request.body.company.changePercentage,
        changeDirection: request.body.company.changeDirection,
        shareVolume: request.body.company.shareVolume,
        buyOrders: request.body.company.buyOrders,
        saleOrders: request.body.company.saleOrders,
        transactions: request.body.company.transactions
    });
    company.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({companies: company});
    });
});

//the six following actions must be synchronized
//if a transaction begins on one company, the same company can not attempt a new transaction
//the transaction will occur, then updating the company, and then deleting buy and sell orders
//if a company with the same id attempts a transaction, the transaction will not go through
var sem = require('semaphore')(1);
sem.take(function(){
    app.post('/buyOrders', function (request, response) {
        var buyOrder = new BuyOrders({
            timeStamp: request.body.buyOrder.timeStamp,
            size: request.body.buyOrder.size,
            price: request.body.buyOrder.price,
            company: request.body.buyOrder.company
        });
        buyOrder.save(function(error) {
            if (error) response.send(error);
            response.status(201).json({buyOrders: buyOrder});
        });
    });

    app.post('/saleOrders', function (request, response) {
        var saleOrder = new SaleOrders({
            timeStamp: request.body.saleOrder.timeStamp,
            size: request.body.saleOrder.size,
            price: request.body.saleOrder.price,
            company: request.body.saleOrder.company
        });
        saleOrder.save(function(error) {
            if (error) response.send(error);
            response.status(201).json({saleOrders: saleOrder});
        });
    });
    app.post('/transactions', function (request, response) {
        var transaction = new Transactions({
            timeStamp: request.body.transaction.timeStamp,
            size: request.body.transaction.size,
            price: request.body.transaction.price,
            company: request.body.transaction.company
        });
        transaction.save(function(error) {
            if (error) response.send(error);
            response.status(201).json({transactions: transaction});
        });
    });

    app.put('/companies/:company_id', function (request, response) {
        Companies.findById(request.params.company_id, function (error, company) {
            if (error) response.send(error);

            // update the company info
            company.name = request.body.company.name,
                company.symbolURL = request.body.company.symbolURL,
                company.openPrice = request.body.company.openPrice,
                company.currentPrice = request.body.company.currentPrice,
                company.changeValue = request.body.company.changeValue,
                company.changeIcon = request.body.company.changeIcon,
                company.changePercentage = request.body.company.changePercentage,
                company.changeDirection = request.body.company.changeDirection,
                company.shareVolume = request.body.company.shareVolume,
                company.buyOrders = request.body.company.buyOrders,
                company.saleOrders = request.body.company.saleOrders,
                company.transactions = request.body.company.transactions

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
    sem.leave();
});

app.listen(3700, function () {
    console.log('Listening on port 3700');
});

