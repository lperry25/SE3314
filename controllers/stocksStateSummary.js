StockApp.StocksStateSummaryController = Ember.ArrayController.extend({
    //item: 'stocksStateSummaryItem',

    sortCriteria: [],
    sortedCompanies: Ember.computed.sort('model','sortCriteria'),

    actions: {
        sortBy: function(criteria) {
            console.log('in sortBy.. ');
            // set model and criteria to sort
            this.set('model', this.store.find('company'));
            this.set('sortCriteria', [criteria]);
        },
        displayGainers: function() {
            console.log('in displayGainers.. ');
            var controller = this;
            this.store.find('company').then(function(companies) {
                // set model and call sort by
                controller.set('model', companies.filterBy('changeSymbol', "images/up.png").sortBy('changePercent:desc'));
                controller.set('sortCriteria', ['changePercent:desc']);
            });
        },
        displayLosers: function() {
            console.log('in displayLosers.. ');
            var controller = this;
            this.store.find('company').then(function(companies) {
                // set model and call sort by
                controller.set('model', companies.filterBy('changeSymbol', "images/down.png").sortBy('changePercent:desc'));
                controller.set('sortCriteria', ['changePercent:desc']);
            });
        }
    }
});

//StockApp.StocksStateSummaryItemController = Ember.ObjectController.extend({

    //changeValue: function() {
    //    if (this.get('currentPrice') != 0) {
    //        return this.get('currentPrice') - this.get('openPrice');
    //    }
    //    else {
    //        return 0.00;
    //    }
    //}.property('currentPrice', 'openPrice'),
    //
    //changeSymbol: function() {
    //    if (this.get('changeValue') > 0) {
    //        return "images/up.png";
    //    }
    //    else if (this.get('changeValue') == 0) {
    //        return "images/noChange.png";
    //    }
    //    else if (this.get('changeValue') < 0) {
    //        return "images/down.png";
    //    }
    //}.property('changeValue'),
    //
    //changePercent: function() {
    //    return Math.abs(this.get('changeValue'))/this.get('openPrice');
    //}.property('changeValue', 'openPrice')
//});

