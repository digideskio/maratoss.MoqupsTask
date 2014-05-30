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