StockApp.PlaceSellOrderController = Ember.Controller.extend({
    actions: {
        submit: function(){
            // Get the order number of shares and price
            var shares = this.get('shares');
            var price = this.get('price');
            var model = this.get('model');
            var store = this.store;
            var sharesSold = 0;

            var buyOrders = model.get('buyOrders').sortBy('buyOrders.price:desc');

            //function to sort buy orders
            var compareBuy = function(a, b) {
                if (parseFloat(a[1]) > parseFloat(b[1]))
                    return -1;
                if (parseFloat(a[1]) < parseFloat(b[1]))
                    return 1;
                return 0;
            }
            buyOrders.sort(compareBuy);
            buyOrders.reverse();

            for (var i = 0; i < buyOrders.length; i++) {
                // transaction if bidder willing to pay more than or as much as selling price
                if (buyOrders[i].get('purchasePrice') >= price) {
                    model.set('currentPrice', price); // change currentPrice to sale price

                    // determine remaining number of shares left on each order and adjust/delete orders as necessary
                    if (buyOrders[i].get('numberShares') > shares) {

                        // subtract the shares sold from the buy order
                        buyOrders[i].set('numberShares', buyOrders[i].get('numberShares') - shares);

                        // set shares for sell order to 0 (all sold)
                        sharesSold += shares;
                        shares = 0;

                        // no more transactions to make
                        break;
                    }
                    else if (buyOrders[i].get('numberShares') == shares) {

                        // delete the buy order
                        store.find('buyOrder', buyOrders[i].get('id')).then(function (order) {
                            store.deleteRecord(order);
                        });

                        // set shares for sell order to 0 (all sold)
                        sharesSold += shares;
                        shares = 0;

                        // no more transactions to make
                        break;
                    }
                    else if (buyOrders[i].get('numberShares') < shares) {

                        // adjusts the share volume variable and number of shares to reflect number sold
                        sharesSold += buyOrders[i].get('numberShares');
                        shares = shares - buyOrders[i].get('numberShares');

                        // delete the buy order
                        store.find('buyOrder', buyOrders[i].get('id')).then(function(order) {
                            store.deleteRecord(order);
                        });
                    }
                }
            }

            // update company shares sold
            model.set('shareVolume', parseInt(model.get('shareVolume') + parseInt(sharesSold)));

            if (shares > 0) {
                // Create the new sellOrder record (only if all shares not sold)
                var sellOrder = store.createRecord('sellOrder', {
                    numberShares: shares,
                    salePrice: price,
                    company: model
                });

                // Save the new record
                sellOrder.save();
            }

            // clear the text fields
            this.set('shares', '');
            this.set('price', '');

            this.transitionTo('stocksStateSummary');
        },

        cancel: function() {
            // clear the text fields
            this.set('shares', '');
            this.set('price', '');

            this.transitionTo('stocksStateSummary');
        }
    }
});