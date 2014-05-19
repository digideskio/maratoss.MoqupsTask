var USER_WAS_ADDED = 'USER_WAS_ADDED';
var GLOBAL_CHANNEL = 'GLOBAL_CHANNEL';
var USER_TOPIC = 'USER_TOPIC';
var ADD_FORM = 'Home/GetAddForm';

$(function () {
    var service = new Service();
    var screen = new Window($('#basicModal'), '#modalBody', '#myModalLabel');
    var navigateManager = new NavigateManager(screen, service);

    var model = new UserViewModel(navigateManager, service);
    InitModel(model, service);
    ko.applyBindings(model);

    postal.subscribe({
        topic: USER_WAS_ADDED,
        callback: function (data) {
            // data is the data published by the publisher
            // envelope is a wrapper around the data & contains
            // metadata about the message like the channel, topic,
            // timestamp and any other data which might have been 
            // added by the sender.
            var user = new User();
            user.Id = data.Id;
            user.Firstname(data.Firstname);
            user.Lastname(data.Lastname);
            user.IsAdmin(data.IsAdmin);
            user.Status(data.Status);
            user.Pages(data.Pages);
            model.Users.push(user);
        }
    });
});