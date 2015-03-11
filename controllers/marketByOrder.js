StockApp.MarketByOrderController = Ember.ArrayController.extend({

    needs:['companyInfo','placeBidOrder'],
    sortedMarketByOrder: function() {
        var companyData = this.get('controllers.companyInfo.model');
        var buyOrders = companyData.get('buyOrders').sortBy('buyOrder.price');
        var sellOrders = companyData.get('sellOrders').sortBy('sellOrder.price');
        var length = 10;
        var size = Math.min(length, Math.max(buyOrders.length, sellOrders.length));
        var sortedOrders = new Array(new Array(size));
        var sortedSellOrders = new Array(new Array(sellOrders.length));
        var sortedBuyOrders = new Array(new Array(buyOrders.length));

        //create an array to display all the buy and sell orders
        for (var i = 0; i < size; i++)
            sortedOrders[i] = new Array('', '', '', '');

        //create an array for only the buy orders
        //this array will be sorted after creation then added to sortedOrders
        for (var i = 0; i< buyOrders.length; i++)
        {
            sortedBuyOrders[i] = new Array(String(buyOrders[i].get('numberShares')),String(buyOrders[i].get('purchasePrice')));
        }

        //create an array for only the sell orders
        //this array will be sorted after creation then added to sortedOrders
        for (var i = 0; i< sellOrders.length; i++)
        {
            sortedSellOrders[i] = new Array(String(sellOrders[i].get('salePrice')),String(sellOrders[i].get('numberShares')));
        }

        //reverse the buy and sell order arrays so that the most recent order is at the top of the list
        sortedBuyOrders.reverse();
        sortedSellOrders.reverse();

        //function to sort buy orders
        var compareBuy = function(a, b) {
            if (parseFloat(a[1]) > parseFloat(b[1]))
                return -1;
            if (parseFloat(a[1]) < parseFloat(b[1]))
                return 1;
            return 0;
        }
        //function to sort sell orders
        var compareSell = function(a, b) {
            if (parseFloat(a[0]) < parseFloat(b[0]))
                return -1;
            if (parseFloat(a[0]) > parseFloat(b[0]))
                return 1;
            return 0;
        }

        //sort the buy and sell order arrays
        sortedBuyOrders.sort(compareBuy);
        sortedSellOrders.sort(compareSell);

        //add the sorted buy and sell orders to the sortedOrders array
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

        //return sortedOrders, so the template can display all rows in this array
        return sortedOrders;
    }.property('controllers.placeBidOrder.model.shareVolume','controllers.companyInfo.model.buyOrders','controllers.companyInfo.model.sellOrders')
});
