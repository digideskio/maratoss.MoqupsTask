$(function () {
    var service = new Service();
    var screen = new Window($('#basicModal'), '#modal-body');
    var navigateManager = new NavigateManager(screen, service);

    var model = new UserViewModel(navigateManager, service);
    fillData(model);
    ko.applyBindings(model);
});

var Window = function (win, contentPath) {
    var self = this;
    var window = win;
    var container = window.find(contentPath);

    self.SetContent = function (content) {
        if (container === null || container.length === 0) {
            throw "container is not found";
        }
        container.html(content);
    };

    self.Get = function() {
        return window[0];
    };
    
    self.Close = function () {
        return window.modal('hide');
    };
    
    self.Open = function () {
        return window.modal('show');
    };
};