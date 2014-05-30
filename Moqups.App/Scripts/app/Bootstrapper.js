var USER_WAS_ADDED = 'USER_WAS_ADDED';
var USER_WAS_MODIFY = 'USER_WAS_MODIFY';
var USER_WAS_DELETED = 'USER_WAS_DELETED';
var ADD_FORM = 'Templates/AddForm.html';

$.ajaxPrefilter('script', function (options) {
    options.cache = true;
});

$(function () {
    var service = new Service();

    var screen = new Window($('#basicModal'), '#modalBody', '#myModalLabel');
    var navigateManager = new NavigateManager(screen, service);

    var model = new UserViewModel(navigateManager, service);
    InitModel(model, service);
    ko.applyBindings(model);
});