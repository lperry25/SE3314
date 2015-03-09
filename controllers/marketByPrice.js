StockApp.MarketByPriceController = Ember.ArrayController.extend({

    needs:['companyInfo'],
    sortedMarketByOrder: function() {
        var companyData = this.get('controllers.companyInfo.model');
        var buyOrders = companyData.get('buyOrders').sortBy('buyOrder.price');
        var sellOrders = companyData.get('sellOrders').sortBy('sellOrder.price');
        var sortedSellOrders = new Array(new Array(sellOrders.length));
        var sortedBuyOrders = new Array(new Array(buyOrders.length));


        for (var i = 0; i< buyOrders.length; i++)
        {
            sortedBuyOrders[i] = new Array(String(buyOrders[i].get('numberShares')),String(buyOrders[i].get('purchasePrice')));
        }

        for (var i = 0; i< sellOrders.length; i++)
        {
            sortedSellOrders[i] = new Array(String(sellOrders[i].get('salePrice')),String(sellOrders[i].get('numberShares')));
        }

        var compare = function(a, b) {
            if (parseFloat(a[1]) > parseFloat(b[1]))
                return -1;
            if (parseFloat(a[1]) < parseFloat(b[1]))
                return 1;
            return 0;
        }

        sortedBuyOrders.reverse();
        sortedSellOrders.reverse();

        sortedBuyOrders.sort(compare);
        sortedSellOrders.sort(compare);

        sortedBuyOrders.sort(compare);
        sortedSellOrders.sort(compare);
        var length = 10;
        var buySize = buyOrders.length;
        var sellSize =sellOrders.length;

        var size = Math.max(buySize,sellSize);
        var sortedOrders = new Array(new Array(size));

        for (var i = 0; i < size; i++)
            sortedOrders[i] = new Array('', '', '', '','','');

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
        index = 0;
        i=0;
        while (index < sellSize)
        {
            if (i>0)
            {
                if (sortedSellOrders[i][0] == sortedSellOrders[i-1][0])
                {
                    index--;
                    totalVolume = parseFloat(totalVolume) + parseFloat(sortedSellOrders[i][0]);
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
    }.property('controllers.companyInfo.model.buyOrders','controllers.companyInfo.model.sellOrders')
});
