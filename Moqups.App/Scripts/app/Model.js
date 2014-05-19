var UserViewModel = function (navigateManager, service) {
    var self = this;

    self.Users = ko.observableArray();
    self.GoToAddUserCommand = function () {
        var editUserViewModel = new EditUserViewModel(new User(), service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel, "Add user");
    };
    self.GoToEditUserCommand = function (user) {
        var editUserViewModel = new EditUserViewModel(createUserFrom(user), service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel, "Edit user");
    };
};

var EditUserViewModel = function (user, service, navigationManager) {
    var self = this;

    self.IsBusy = ko.observable(false);
    self.User = ko.observable(user);
    self.AvaiablePages = ko.observableArray(exceptPage(service.getPages(), user.Pages()));
    self.AvaiableStatuses = ko.observableArray(statusConverter.GetStatuses());
    self.AddUserCommand = function () {
        self.IsBusy(true);
        service.addUser(self.User(), addedIsSuccessful, onError, addComplete);
    };
    self.CancelCommand = function () {
        navigationManager.GoBack();
    };
    self.RemoveUserCommand = function (deletingUser) {
        self.IsBusy(true);
        service.DeleteUser(deletingUser, null, onError, function () {
            self.IsBusy(false);
        });
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