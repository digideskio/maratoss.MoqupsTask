var USER_WAS_ADDED = 'USER_WAS_ADDED';
var USER_WAS_MODIFY = 'USER_WAS_MODIFY';
var USER_WAS_DELETED = 'USER_WAS_DELETED';
var GLOBAL_CHANNEL = 'GLOBAL_CHANNEL';
var USER_TOPIC = 'USER_TOPIC';
var ADD_FORM = 'Home/GetAddForm';

var StatusConvert = function () {
    var self = this;
    var dict = [];

    self.SetStatuses = function (statuses) {
        dict = statuses;
    };

    self.GetStatuses = function () {
        return dict;
    };

    self.GetStatusById = function (id) {
        for (var i = 0; i < dict.length; i++) {
            var item = dict[i];
            if (item.Id === id) {
                return item;
            }
        }

        throw "The status with id is not found";
    };
};

var statusConverter = new StatusConvert();

$(function () {
    var service = new Service();
    statusConverter.SetStatuses(service.getStatuses());

    var screen = new Window($('#basicModal'), '#modalBody', '#myModalLabel');
    var navigateManager = new NavigateManager(screen, service);

    var model = new UserViewModel(navigateManager, service);
    InitModel(model, service);
    ko.applyBindings(model);
});