$(function () {
    var navigateManager = new NavigateManager($('#dialog'));
    //navigateManager.RegisterView('Home/GetAddForm', 'EditUserViewModel');
    var service = new Service();

    var model = new UserViewModel(navigateManager, service);
    fillData(model);
    ko.applyBindings(model);
});