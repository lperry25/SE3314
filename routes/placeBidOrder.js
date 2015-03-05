StockApp.PlaceBidOrderRoute = Ember.Route.extend({
    // model of company bid order to be placed for
    model: function(params){
        return this.store.find("company", params.id);
    }
});