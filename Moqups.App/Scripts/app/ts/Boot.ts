///<reference path="Service.ts" />
///<reference path="NavigationManager.ts" />
///<reference path="UserViewModel.ts" />
///<reference path="HostScreen.ts" />

module App {
    $.ajaxPrefilter('script', options => {
        options.cache = true;
    });

    $(() => {
        var service = new Service();

        var screen = new HostScreen($('#basicModal'), '#modalBody', '#myModalLabel');
        var navigateManager = new NavigationManager(screen, service);

        var model = new UserViewModel(navigateManager, service);
        initModel(model, service);
        ko.applyBindings(model);
    });

    function initModel(userViewModel: UserViewModel, service: Service) {
        service.GetAllUsers(null, (users: Array<User>) => {
            userViewModel.Users(users);
        }, error => {
            alert(error.responseText);
        });
    };
}