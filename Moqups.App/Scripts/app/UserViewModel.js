var UserViewModel = function (navigateManager, service) {
    var self = this;

    self.IsBusy = ko.observable(false);
    self.Users = ko.observableArray();
    
    self.GoToAddUserCommand = function () {
        var editUserViewModel = new EditUserViewModel(new User(), service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel, "ADD USER");
    };
    self.GoToEditUserCommand = function (user) {
        var editUserViewModel = new EditUserViewModel(createUserFrom(user), service, navigateManager);
        navigateManager.OpenInNewWindow(ADD_FORM, editUserViewModel, "EDIT USER");
    };

    // message bus
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