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

    postal.subscribe({
        topic: USER_WAS_ADDED,
        callback: function (data) {
            var user = new User();
            user.Id = data.Id;
            user.Firstname(data.Firstname);
            user.Lastname(data.Lastname);
            user.IsAdmin(data.IsAdmin);
            user.Status(data.Status);
            user.Pages(data.Pages);
            self.Users.push(user);
        }
    });

    postal.subscribe({
        topic: USER_WAS_MODIFY,
        callback: function (data) {
            var index = indexOfUser(data);
            if (index > -1) {
                var modifyUser = self.Users()[index];
                modifyUser.Id = data.Id;
                modifyUser.Firstname(data.Firstname);
                modifyUser.Lastname(data.Lastname);
                modifyUser.IsAdmin(data.IsAdmin);
                modifyUser.Status(data.Status);
                modifyUser.Pages(data.Pages);
            }
        }
    });

    postal.subscribe({
        topic: USER_WAS_DELETED,
        callback: function (deletedUser) {
            var index = indexOfUser(deletedUser);
            if (index > -1) {
                self.Users.splice(index, 1);
            }
        }
    });

    var indexOfUser = function (userItem) {
        var arrUser = self.Users();
        for (var i = 0; i < arrUser.length; i++) {
            if (arrUser[i].Id === userItem.Id) {
                return i;
            }
        }

        return -1;
    };
};

var EditUserViewModel = function (user, service, navigationManager) {
    var self = this;

    self.IsBusy = ko.observable(false);
    self.User = ko.observable(user);
    self.AvaiablePages = ko.observableArray(exceptPage(service.getPages(), user.Pages()));
    self.AvaiableStatuses = ko.observableArray(statusConverter.GetStatuses());
    self.SaveUserCommand = function () {
        self.IsBusy(true);
        service.SaveOrUpdateUser(self.User(), addedIsSuccessful, onError, addComplete);
    };
    self.CancelCommand = function () {
        navigationManager.GoBack();
    };
    self.RemoveUserCommand = function () {
        if (!confirm("Are you sure?")) {
            return;
        }

        self.IsBusy(true);
        service.DeleteUser(self.User(), function () {
            postal.publish({
                topic: USER_WAS_DELETED,
                data: self.User()
            });
            navigationManager.GoBack();
        }, onError, function () {
            self.IsBusy(false);
        });
    };

    var addedIsSuccessful = function (addedUser) {
        postal.publish({
            topic: self.User().isCreated ? USER_WAS_MODIFY : USER_WAS_ADDED,
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