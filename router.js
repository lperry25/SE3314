/**
 * Created by Laura on 2015-02-27.
 */
StockApp.Router.map(function() {
    this.resource('stocksStateSummary', {path: '/'});
    this.resource('companyInfo');
/*    this.resource('marketByOrder');
    this.resource('marketByPrice');
    this.resource('symbol');
  */  this.resource('placeBidOrder',{path:'/bid'});
    this.resource('placeSellOrder',{path: '/sell'});
});

StockApp.PostsRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('marketByOrder');
        this.render('marketByPrice');
        this.render('symbol');
    }
});