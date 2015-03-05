StockApp.StocksStateSummaryRoute = Ember.Route.extend({
    // model of all companies to populate stockStateSummary
    model: function(){
       return this.store.find("company");
    }
});