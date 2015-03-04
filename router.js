StockApp.Router.map(function() {
    this.resource('stocksStateSummary', {path: '/'}, function() {
        this.resource('marketByOrder');
        this.resource('marketByPrice');
        this.resource('symbol');
        this.resource('companyInfo');
    });
    this.resource('placeBidOrder',{path:'/bid'});
    this.resource('placeSellOrder',{path: '/sell'});
});
