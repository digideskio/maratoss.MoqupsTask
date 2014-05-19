var TooltipService = function () {
    var self = this;
    var dict = new Array();

    self.Register = function (key, value, contract) {
        dict[key, contract] = value;
    };

    self.GetTooltip = function (key, contract) {
        return dict[key, contract];
    };
}