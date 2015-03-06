StockApp.PlaceBidOrderController = Ember.Controller.extend({
    actions: {
        submit: function(){
            // Get the order number of shares and price
            var shares = this.get('shares');
            var price = this.get('price');

            console.log("inside PlaceBidOrderController submit, shares: "+shares+", price: "+price);

            // Create the new sellOrder model
            var buyOrder = this.store.createRecord('buyOrder', {
                numberShares: shares,
                purchasePrice: price
            });

            // Save the new model
            buyOrder.save();

            // clear the text fields
            this.set('shares', '');
            this.set('price', '');

            this.transitionTo('stocksStateSummary');
        }
    }
});