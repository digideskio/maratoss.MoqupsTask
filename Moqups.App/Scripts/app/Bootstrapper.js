$(function () {
    var service = new Service();
    var navigateManager = new NavigateManager($('#dialog'), service);
    //navigateManager.RegisterView('Home/GetAddForm', 'EditUserViewModel');

    var model = new UserViewModel(navigateManager, service);
    fillData(model);
    ko.applyBindings(model);
});