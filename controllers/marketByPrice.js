StockApp.MarketByPriceController = Ember.ArrayController.extend({

    needs:['companyInfo','placeBidOrder'],
    sortedMarketByOrder: function() {
        var companyData = this.get('controllers.companyInfo.model');
        var buyOrders = companyData.get('buyOrders').sortBy('buyOrder.price');
        var sellOrders = companyData.get('sellOrders').sortBy('sellOrder.price');
        var sortedSellOrders = new Array(new Array(sellOrders.length));
        var sortedBuyOrders = new Array(new Array(buyOrders.length));

        //create an array of just the buy orders
        //this array will be sorted after creation then added to sortedOrders
        for (var i = 0; i< buyOrders.length; i++)
        {
            sortedBuyOrders[i] = new Array(String(buyOrders[i].get('numberShares')),String(buyOrders[i].get('purchasePrice')));
        }

        //create an array of just the sell orders
        //this array will be sorted after creation then added to sortedOrders
        for (var i = 0; i< sellOrders.length; i++)
        {
            sortedSellOrders[i] = new Array(String(sellOrders[i].get('salePrice')),String(sellOrders[i].get('numberShares')));
        }

        //reverse the buy and sell orders so the most recent is displayed first
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

        var length = 10;
        var buySize = buyOrders.length;
        var sellSize =sellOrders.length;

        //create a sortedOrders array to put all sell and bid orders into it
        var size = Math.max(buySize,sellSize);
        var sortedOrders = new Array(new Array(size));
        for (var i = 0; i < size; i++)
            sortedOrders[i] = new Array('', '', '', '','','');

        //populate sortedOrders array and fill with bid orders
        var totalVolume = 0;
        var count = 0;
        var index =0;
        var i=0;
        while (index < buySize) {
                if (i>0)
                {
                    if (sortedBuyOrders[i][1] == sortedBuyOrders[i-1][1])
                    {
                        index--;
                        totalVolume = parseFloat(totalVolume) + parseFloat(sortedBuyOrders[i][0]);
                        count ++;
                        sortedOrders[index][0] = count;
                        sortedOrders[index][1] = totalVolume;
                        sortedOrders[index][2] = sortedBuyOrders[i][1];
                        i++;
                        index++;
                        buySize--;
                    }
                    else
                    {
                        count = 1;
                        sortedOrders[index][0] = count;
                        sortedOrders[index][1] = sortedBuyOrders[i][0];
                        totalVolume = sortedBuyOrders[i][0];
                        sortedOrders[index][2] = sortedBuyOrders[i][1];
                        i++;
                        index++;
                    }
                }
                else
                {
                    count = 1;
                    sortedOrders[index][0] = count;
                    sortedOrders[index][1] = sortedBuyOrders[i][0];
                    totalVolume = sortedBuyOrders[i][0];
                    sortedOrders[index][2] = sortedBuyOrders[i][1];
                    i++;
                    index++;
                }
        }

        //populate sortedOrders array and fill with sell orders
        index = 0;
        i=0;
        while (index < sellSize)
        {
            if (i>0)
            {
                if (sortedSellOrders[i][0] == sortedSellOrders[i-1][0])
                {
                    index--;
                    totalVolume = parseFloat(totalVolume) + parseFloat(sortedSellOrders[i][1]);
                    count ++;
                    sortedOrders[index][5] = count;
                    sortedOrders[index][4] = totalVolume;
                    sortedOrders[index][3] = sortedSellOrders[i][0];
                    i++;
                    index++;
                    sellSize--;
                }
                else
                {
                    count = 1;
                    sortedOrders[index][5] = count;
                    sortedOrders[index][4] = sortedSellOrders[i][1];
                    totalVolume = sortedSellOrders[i][1];
                    sortedOrders[index][3] = sortedSellOrders[i][0];
                    i++;
                    index++;
                }
            }
            else
            {
                count = 1;
                sortedOrders[index][5] = count;
                sortedOrders[index][4] = sortedSellOrders[i][1];
                totalVolume = sortedSellOrders[i][1];
                sortedOrders[index][3] = sortedSellOrders[i][0];
                i++;
                index++;
            }
        }

        //this code cuts off the extra bottom lines that appear under the filled rows
        var length = 10;
        var size = Math.min(length, Math.max(buySize,sellSize));
        var finalSortedOrders = new Array(new Array(size));

        for (var i = 0; i < size; i++)
            finalSortedOrders[i] = new Array('', '', '', '','','');

        for (i=0; i<size;i++)
        {
            if (i < buyOrders.length) {
                finalSortedOrders[i][0] = sortedOrders[i][0];
                finalSortedOrders[i][1] = sortedOrders[i][1];
                finalSortedOrders[i][2] = sortedOrders[i][2];
            }
            if (i < sellOrders.length) {
                finalSortedOrders[i][3] = sortedOrders[i][3];
                finalSortedOrders[i][4] = sortedOrders[i][4];
                finalSortedOrders[i][5] = sortedOrders[i][5];
            }
        }

        return finalSortedOrders;
    }.property('controllers.placeBidOrder.model.shareVolume','controllers.companyInfo.model.buyOrders','controllers.companyInfo.model.sellOrders')
});
