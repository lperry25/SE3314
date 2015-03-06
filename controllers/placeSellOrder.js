StockApp.PlaceSellOrderController = Ember.Controller.extend({
    actions: {
        submit: function(){
            // Get the order number of shares and price
            var shares = this.get('shares');
            var price = this.get('price');

            console.log("inside PlaceSellOrderController submit, shares: "+shares+", price: "+price);

            // Create the new sellOrder model
            var sellOrder = this.store.createRecord('sellOrder', {
                numberShares: shares,
                salePrice: price
            });

            // Save the new model
            sellOrder.save();

            // clear the text fields
            this.set('shares', '');
            this.set('price', '');

            this.transitionTo('stocksStateSummary');
        }
    }
});