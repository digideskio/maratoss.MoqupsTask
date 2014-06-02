///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/knockout/knockout.d.ts" />
///<reference path="../../typings/postal.d.ts" />
///<reference path="Service.ts" />
///<reference path="Entities.ts" />
///<reference path="Envirotment.ts" />
var App;
(function (App) {
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
            var _this = this;
            if (!confirm("Are you sure?")) {
                return;
            }

            this.IsBusy(true);
            this._service.DeleteUser(this.User(), function () {
                postal.publish(App.Envirotment.USER_WAS_DELETED, _this.User());
                _this._navigationManager.GoBack();
            }, this.onError, function () {
                _this.IsBusy(false);
            });
        };

        EditUserViewModel.prototype.saveOrUpdateIsSuccessful = function (userData) {
            var topic = this.User().isCreated() ? App.Envirotment.USER_WAS_MODIFY : App.Envirotment.USER_WAS_ADDED;
            postal.publish(topic, userData);
            this._navigationManager.GoBack();
        };

        EditUserViewModel.prototype.onError = function (err) {
            alert(err.responseText);
        };
        return EditUserViewModel;
    })();
    App.EditUserViewModel = EditUserViewModel;
})(App || (App = {}));
