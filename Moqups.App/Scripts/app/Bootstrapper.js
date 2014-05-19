var USER_WAS_ADDED = 'USER_WAS_ADDED';
var USER_WAS_MODIFY = 'USER_WAS_MODIFY';
var USER_WAS_DELETED = 'USER_WAS_DELETED';
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

//var tooltipService = new TooltipService();
var statusConverter = new StatusConvert();

$(function () {
    //tooltipService.Register('User.Firstname', 'enter firstname for add', 'ADD');
    //tooltipService.Register('User.Firstname', 'enter firstname for edit', 'EDIT');
    //tooltipService.Register('User.Lastname', 'enter Lastname for add', 'ADD');
    //tooltipService.Register('User.Lastname', 'enter Lastname for edit', 'EDIT');

    var service = new Service();
    statusConverter.SetStatuses(service.getStatuses());

    var screen = new Window($('#basicModal'), '#modalBody', '#myModalLabel');
    var navigateManager = new NavigateManager(screen, service);

    var model = new UserViewModel(navigateManager, service);
    InitModel(model, service);
    ko.applyBindings(model);
});