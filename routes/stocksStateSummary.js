StockApp.StocksStateSummaryRoute = Ember.Route.extend({
    // model of all companies to populate stockStateSummary
    model: function(){
       return this.store.find("company");
    },
    afterModel: function(companies, transition) {
        this.transitionTo("companyInfo", companies.get("firstObject"));
    }
});