var EditUserViewModel = function (user, service, navigationManager) {
    var self = this;

    self.IsBusy = ko.observable(true);
    self.User = ko.observable(user);
    self.AvaiablePages = ko.observableArray();
    self.AvaiableStatuses = ko.observableArray(statusConverter.GetStatuses());

    self.SaveUserCommand = function () {
        self.IsBusy(true);
        service.SaveOrUpdateUser(self.User(), saveOrUpdateIsSuccessful, onError, function () {
            self.IsBusy(false);
        });
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

    var saveOrUpdateIsSuccessful = function (userData) {
        var topic = self.User().isCreated() ? USER_WAS_MODIFY : USER_WAS_ADDED;
        postal.publish({
            topic: topic,
            data: userData
        });
        navigationManager.GoBack();
    };

    var onError = function (err) {
        alert(err.responseText);
    };

    // init
    service.getPages(function (pages) {
        self.AvaiablePages(exceptPage(pages, user.Pages()));
    }, function (err) {
        onError(err);
        navigationManager.GoBack();
    }, function () {
        self.IsBusy(false);
    });
};