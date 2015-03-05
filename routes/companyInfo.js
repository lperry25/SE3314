StockApp.CompanyInfoRoute = Ember.Route.extend({
    // model of company selected to show company specific marketByOrder, marketByPrice, and symbol
    model: function(params){
        return this.store.find("company", params.id);
    },
    // render marketByOrder, marketByPrice, and symbol templates beneath stockStateSummary
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