StockApp.PlaceSellOrderRoute = Ember.Route.extend({
    // model of company sell order to be placed for
    model: function(params){
        return this.store.find("company", params.id);
    }
});