StockApp.SymbolRoute =Ember.Route.extend({
    model:function(){
        return this.store.find("symbol");
    }
    //renderTemplate: function() {
    //    this.render({
    //        outlet: 'symbol'
    //    });
    //}
});