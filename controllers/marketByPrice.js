StockApp.MarketByPriceController = Ember.ArrayController.extend({

    needs:['companyInfo'],
    sortedMarketByOrder: function() {
        var companyData = this.get('controllers.companyInfo.model');
        var buyOrders = companyData.get('buyOrders').sortBy('buyOrders.price:desc');
        var sellOrders = companyData.get('sellOrders').sortBy('sellOrders.price:asc');
        var tableLength = 10;
        var size = Math.min(tableLength, Math.max(buyOrders.length, sellOrders.length));
        var sortedOrders = new Ember.A(new Array(size));

        for (var i = 0; i < size; i++)
            sortedOrders[i] = new Ember.A(['', '', '', '','','']);

        for (var i = 0; i < size; i++) {
            if (i < buyOrders.length) {
                sortedOrders[i][1] = String(buyOrders[i].get('numberShares'));
                sortedOrders[i][2] = String(buyOrders[i].get('purchasePrice'));
            }
            if (i < sellOrders.length) {
                sortedOrders[i][3] = String(sellOrders[i].get('numberShares'));
                sortedOrders[i][4] = String(sellOrders[i].get('salePrice'));
            }
        }
        return sortedOrders;
    }.property('controllers.companyInfo.model.buyOrders','controllers.companyInfo.model.sellOrders')
});