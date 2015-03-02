/**
 * Created by Laura on 2015-02-27.
 */

StockApp.StocksStateSummaryRoute =Ember.Route.extend({
   model:function(){
       return this.store.find("stocksStateSummary");
   }
});