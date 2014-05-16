var ADD_FORM = 'Home/GetAddForm';

var UserViewModel = function (navigateManager, service) {
    var self = this;

    self.Users = ko.observableArray();
    self.GoToAddUserCommand = function () {
        var editUserViewModel = new EditUserViewModel(new User(), service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel);
    };
    self.GoToEditUserCommand = function (newUser) {
        alert('GoToEditUserCommand');
    };
    self.DeleteUserCommand = function (id) {
        alert('DeleteUserCommand');
    };
};

var EditUserViewModel = function (user, service, navigationManager) {
    var self = this;

    self.User = ko.observable(user);
    self.AvaiablePages = service.getPages();
    self.AvaiableStatuses = service.getStatuses();
    self.AddUserCommand = function () {
        service.addUser(User(), null, function(err) {
            alert(err.responseText);
        });
    };
    self.CancelCommand = function () {
        navigationManager.GoBack();
    };
    self.RemoveUserCommand = function () {
        alert('RemoveUserCommand');
    };
};