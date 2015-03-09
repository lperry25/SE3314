StockApp.PlaceBidOrderController = Ember.Controller.extend({
    actions: {
        submit: function(){
            // Get the order number of shares and price
            var shares = this.get('shares');
            var price = this.get('price');
            var model = this.get('model');

            console.log("inside PlaceBidOrderController submit, shares: "+shares+", price: "+price);

            var sellOrders = model.get('sellOrders').sortBy('sellOrders.price:asc');

            for (var i = 0; i < sellOrders.length; i++) {
                // transaction if bidder willing to pay more than or as much as selling price
                if (price >= sellOrders[i].get('salePrice')) {
                    model.set('currentPrice', price); // change currentPrice to bid price

                    // determine remaining number of shares left on each order and adjust/delete orders as necessary
                    if (sellOrders[i].get('numberShares') > shares) {
                        console.log('bid order - numb shares less than sell order');

                        // subtract the shares sold from the sell order
                        sellOrders[i].set('numberShares', sellOrders[i].get('numberShares') - shares);

                        // set shares for bid order to 0 (all bought)
                        shares = 0;

                        // no more transactions to make
                        break;
                    }
                    else if (sellOrders[i].get('numberShares') == shares) {
                        console.log('bid order - numb shares equal to sell order');

                        // delete the sell order
                        this.store.find('sellOrder', sellOrders[i].get('id')).then(function (order) {
                            order.deleteRecord();
                            order.save();
                        });

                        // set shares for bid order to 0 (all bought)
                        shares = 0;

                        // no more transactions to make
                        break;
                    }
                    else if (sellOrders[i].get('numberShares') < shares) {
                        console.log('bid order - numb shares greater than sell order');

                        // adjusts the number of shares to reflect number sold
                        shares = shares - sellOrders[i].get('numberShares');

                        // delete the buy order
                        this.store.find('sellOrder', sellOrders[i].get('id')).then(function(order) {
                            order.deleteRecord();
                            order.save();
                        });
                    }
                }
            }

            if (shares > 0) {
                // Create the new buyOrder record (only if all shares not bought)
                var buyOrder = this.store.createRecord('buyOrder', {
                    numberShares: shares,
                    purchasePrice: price,
                    company: model
                });

                // Save the new record
                buyOrder.save();
            }

            // clear the text fields
            this.set('shares', '');
            this.set('price', '');

            this.transitionTo('stocksStateSummary');
        }
    }
});