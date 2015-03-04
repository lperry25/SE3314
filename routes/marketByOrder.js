StockApp.MarketByOrderRoute =Ember.Route.extend({
   model:function(){
       return this.store.find("marketByOrder");
   },
   renderTemplate: function() {
       this.render({
           outlet: 'marketByOrder'
       });
   }
});