///<reference path="Service.ts" />
///<reference path="NavigationManager.ts" />
///<reference path="UserViewModel.ts" />
///<reference path="HostScreen.ts" />
var App;
(function (App) {
    $.ajaxPrefilter('script', function (options) {
        options.cache = true;
    });

    $(function () {
        var service = new App.Service();

        var screen = new App.HostScreen($('#basicModal'), '#modalBody', '#myModalLabel');
        var navigateManager = new App.NavigationManager(screen, service);

        var model = new App.UserViewModel(navigateManager, service);
        initModel(model, service);
        ko.applyBindings(model);
    });

    function initModel(userViewModel, service) {
        service.GetAllUsers(null, function (users) {
            userViewModel.Users(users);
        }, function (error) {
            alert(error.responseText);
        });
    }
    ;
})(App || (App = {}));
