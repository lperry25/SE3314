/**
 * Created by Laura on 2015-02-27.
 */
StockApp.StocksStateSummary = DS.Model.extend({
    company: DS.attr(),
    openPrice: DS.attr(),
    currentPrice: DS.attr(),
    changeValue: DS.attr(),
    changePercent: DS.attr(),
    shareVolume: DS.attr()
});