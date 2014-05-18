var USER_WAS_ADDED = 'USER_WAS_ADDED';
var GLOBAL_CHANNEL = 'GLOBAL_CHANNEL';
var USER_TOPIC = 'USER_TOPIC';
var ADD_FORM = 'Home/GetAddForm';

$(function () {
    var service = new Service();
    var screen = new Window($('#basicModal'), '#modalBody');
    var navigateManager = new NavigateManager(screen, service);

    var model = new UserViewModel(navigateManager, service);
    fillData(model);
    ko.applyBindings(model);

//    postal.channel(GLOBAL_CHANNEL, USER_WAS_ADDED).subscribe(
//        function (data, envelope) {
//            // data is the data published by the publisher
//            // envelope is a wrapper around the data & contains
//            // metadata about the message like the channel, topic,
//            // timestamp and any other data which might have been 
//            // added by the sender.
//            var user = new User();
//            user.Id(data.Id);
//            user.Firstname(data.Firstname);
//            user.Lastname(data.Lastname);
//            user.IsAdmin(data.IsAdmin);
//            user.Status(data.Status);
//            user.Pages(data.Pages);
//            model.Users().push(user);
//        });
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

    self.Get = function () {
        return window[0];
    };

    self.Close = function () {
        window.modal('hide');
    };

    self.Open = function () {
        window.modal('show');
    };
};