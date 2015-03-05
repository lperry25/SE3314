StockApp.BuyOrder = DS.Model.extend({
    numberShares: DS.attr('number'),

    purchasePrice: DS.attr('number')

    //company: DS.belongsTo('company')
});