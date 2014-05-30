///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="Entities.ts" />
///<reference path="../..//typings/knockout/knockout.d.ts" />
var EditUserViewModel = (function () {
    function EditUserViewModel(user, service, navigationManager) {
        this.IsBusy = ko.observable(true);
        this.User = ko.observable();
        this.AvaiablePages = ko.observableArray();
        this.AvaiableStatuses = ko.observableArray();
        this.User(user);
        this._service = service;
        this._navigationManager = navigationManager;
    }
    EditUserViewModel.prototype.SaveUserCommand = function () {
        this.IsBusy(true);
        this._service.SaveOrUpdateUser(this.User(), this.saveOrUpdateIsSuccessful, this.onError, function () {
            this.IsBusy(false);
        });
    };

    EditUserViewModel.prototype.CancelCommand = function () {
        this._navigationManager.GoBack();
    };

    EditUserViewModel.prototype.RemoveUserCommand = function () {
        if (!confirm("Are you sure?")) {
            return;
        }

        this.IsBusy(true);
        this._service.DeleteUser(this.User(), function () {
            postal.publish({
                topic: USER_WAS_DELETED,
                data: self.User()
            });
            navigationManager.GoBack();
        }, onError, function () {
            self.IsBusy(false);
        });
    };

    EditUserViewModel.prototype.saveOrUpdateIsSuccessful = function (userData) {
        var topic = this.User().isCreated() ? USER_WAS_MODIFY : USER_WAS_ADDED;
        postal.publish({
            topic: topic,
            data: userData
        });
        this._navigationManager.GoBack();
    };

    EditUserViewModel.prototype.onError = function (err) {
        alert(err.responseText);
    };
    return EditUserViewModel;
})();
