StockApp.Company = DS.Model.extend({
    name: DS.attr(),

    openPrice: DS.attr(),

    currentPrice: DS.attr('number', {defaultValue: 0}),

    changeValue: function() {
        if (this.get('currentPrice') != 0) {
            return this.get('currentPrice') - this.get('openPrice');
        }
        else {
            return 0.00;
        }
    }.property('currentPrice', 'openPrice'),

    changeSymbol: function() {
        if (this.get('changeValue') > 0) {
            return "images/up.png";
        }
        else if (this.get('changeValue') == 0) {
            return "images/noChange.png";
        }
        else if (this.get('changeValue') < 0) {
            return "images/down.png";
        }
    }.property('changeValue'),

    changePercent: function() {
        return Math.abs(this.get('changeValue'))/this.get('openPrice');
    }.property('changeValue', 'openPrice'),

    shareVolume: DS.attr('number', {defaultValue: 0}),

    companyLogo: DS.attr()

    //buyOrders: DS.hasMany('buyOrder'),
    //
    //sellOrders: DS.hasMany('sellOrder')
});