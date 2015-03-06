StockApp.SellOrder = DS.Model.extend({
    numberShares: DS.attr('number'),

    salePrice: DS.attr('number'),

    company: DS.belongsTo('company', { async: true })
});