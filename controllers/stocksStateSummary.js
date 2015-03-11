StockApp.StocksStateSummaryController = Ember.ArrayController.extend({

    sortCriteria: [],
    sortedCompanies: Ember.computed.sort('model','sortCriteria'),

    actions: {
        sortBy: function(criteria) {
            // set model and criteria to sort
            this.set('model', this.store.find('company'));
            this.set('sortCriteria', [criteria]);
        },
        displayGainers: function() {
            var controller = this;
            this.store.find('company').then(function(companies) {
                // set model and call sort by
                controller.set('model', companies.filterBy('changeSymbol', "images/up.png").sortBy('changePercent:desc'));
                controller.set('sortCriteria', ['changePercent:desc']);
            });
        },
        displayLosers: function() {
            var controller = this;
            this.store.find('company').then(function(companies) {
                // set model and call sort by
                controller.set('model', companies.filterBy('changeSymbol', "images/down.png").sortBy('changePercent:desc'));
                controller.set('sortCriteria', ['changePercent:desc']);
            });
        }
    }
});

