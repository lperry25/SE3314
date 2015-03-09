StockApp.MarketByOrderController = Ember.ArrayController.extend({

    needs:['companyInfo'],
    sortedMarketByOrder: function() {
        var companyData = this.get('controllers.companyInfo.model');
        var buyOrders = companyData.get('buyOrders').sortBy('buyOrder.price');
        var sellOrders = companyData.get('sellOrders').sortBy('sellOrder.price');
        //var buyOrders = companyData.get('buyOrders');
        //var sellOrders = companyData.get('sellOrders');
        var length = 10;
        var size = Math.min(length, Math.max(buyOrders.length, sellOrders.length));
        var sortedOrders = new Array(new Array(size));
        var sortedSellOrders = new Array(new Array(sellOrders.length));
        var sortedBuyOrders = new Array(new Array(buyOrders.length));

        for (var i = 0; i < size; i++)
            sortedOrders[i] = new Array('', '', '', '');

        for (var i = 0; i< buyOrders.length; i++)
        {
            sortedBuyOrders[i] = new Array(String(buyOrders[i].get('numberShares')),String(buyOrders[i].get('purchasePrice')));
        }

        for (var i = 0; i< sellOrders.length; i++)
        {
            sortedSellOrders[i] = new Array(String(sellOrders[i].get('salePrice')),String(sellOrders[i].get('numberShares')));
        }

        sortedBuyOrders.reverse();
        sortedSellOrders.reverse();

        var compare = function(a, b) {
            if (parseInt(a[1]) > parseInt(b[1]))
                return -1;
            if (parseInt(a[1]) < parseInt(b[1]))
                return 1;
            return 0;
        }

        sortedBuyOrders.sort(compare);
        sortedSellOrders.sort(compare);

        for (var i = 0; i < size; i++) {
            if (i < buyOrders.length) {
                sortedOrders[i][0] = sortedBuyOrders[i][0];
                sortedOrders[i][1] = sortedBuyOrders[i][1];
            }
            if (i < sellOrders.length) {
                sortedOrders[i][2] = sortedSellOrders[i][0];
                sortedOrders[i][3] = sortedSellOrders[i][1];
            }
        }
        return sortedOrders;
    }.property('controllers.companyInfo.model.buyOrders','controllers.companyInfo.model.sellOrders')
});
