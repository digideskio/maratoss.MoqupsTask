var UserViewModel = function (navigateManager, service) {
    var self = this;

    self.Users = ko.observableArray();
    self.GoToAddUserCommand = function () {
        var editUserViewModel = new EditUserViewModel(new User(), service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel);
    };
    self.GoToEditUserCommand = function (user) {
        alert('GoToEditUserCommand');
    };
    self.DeleteUserCommand = function (id) {
        alert('DeleteUserCommand');
    };
};

var EditUserViewModel = function (user, service, navigationManager) {
    var self = this;

    self.IsBusy = ko.observable(false);
    self.User = ko.observable(user);
    self.AvaiablePages = service.getPages();
    self.AvaiableStatuses = service.getStatuses();
    self.AddUserCommand = function () {
        self.IsBusy(true);
        service.addUser(self.User(), addedIsSuccessfull, onError, addComplete);
    };
    self.CancelCommand = function () {
        navigationManager.GoBack();
    };
    self.RemoveUserCommand = function () {
        alert('RemoveUserCommand');
    };

    var addedIsSuccessfull = function (addedUser) {
        alert('OK');
        postal.channel(GLOBAL_CHANNEL, USER_WAS_ADDED).publish(addedUser);
    };

    var addComplete = function () {
        self.IsBusy(false);
    };

    var onError = function (err) {
        alert(err.responseText);
    };
};