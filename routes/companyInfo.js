StockApp.CompanyInfoRoute =Ember.Route.extend({
    renderTemplate: function(){
        this.render('marketByOrder',{
            outlet: "marketByOrder",
            into: "stocksStateSummary"
        });
        this.render('marketByPrice',{
            outlet: "marketByPrice",
            into: "stocksStateSummary"
        });
        this.render('symbol',{
            outlet: "symbol",
            into: "stocksStateSummary"
        });
    }
});