var UserViewModel = function (navigateManager, service) {
    var self = this;

    self.Users = ko.observableArray();
    self.GoToAddUserCommand = function () {
        var editUserViewModel = new EditUserViewModel(new User(), service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel);
    };
    self.GoToEditUserCommand = function (user) {
        var editUserViewModel = new EditUserViewModel(user, service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel);
    };
    self.DeleteUserCommand = function (id) {
        alert('DeleteUserCommand');
    };
};

var EditUserViewModel = function (user, service, navigationManager) {
    var self = this;

    self.IsBusy = ko.observable(false);
    self.User = ko.observable(user);
    self.AvaiablePages = ko.observableArray(service.getPages());
    self.AvaiableStatuses = ko.observableArray(service.getStatuses());
    self.AddUserCommand = function () {
        self.IsBusy(true);
        service.addUser(self.User(), addedIsSuccessful, onError, addComplete);
    };
    self.CancelCommand = function () {
        navigationManager.GoBack();
    };
    self.RemoveUserCommand = function () {
        alert('RemoveUserCommand');
    };

    var addedIsSuccessful = function (addedUser) {
        postal.publish({
            topic: USER_WAS_ADDED,
            data: addedUser
        });
        navigationManager.GoBack();
    };

    var addComplete = function () {
        self.IsBusy(false);
    };

    var onError = function (err) {
        alert(err.responseText);
    };
};