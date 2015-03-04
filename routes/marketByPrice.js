StockApp.MarketByPriceRoute =Ember.Route.extend({
    model:function(){
        return this.store.find("marketByPrice");
    },
    renderTemplate: function() {
        this.render({
            outlet: 'marketByPrice'
        });
    }
});