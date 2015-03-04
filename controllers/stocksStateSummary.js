StockApp.StocksStateSummaryController =Ember.Controller.extend({
    displayedCompany: false,

    actions: {
        displayCompany: function(id){
            console.log("inside displayCompany "+ id);
            this.set ('displayedCompany', true);
        }
    }
});