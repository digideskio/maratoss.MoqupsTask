///<reference path="EditUserViewModel.ts"/>
///<reference path="../../typings/postal.d.ts"/>
///<reference path="Envirotment.ts"/>
var App;
(function (App) {
    var UserViewModel = (function () {
        function UserViewModel(navigateManager, service) {
            var _this = this;
            this.IsBusy = ko.observable(false);
            this.Users = ko.observableArray();
            this.indexOfUser = function (userItem) {
                var arrUser = _this.Users();
                for (var i = 0; i < arrUser.length; i++) {
                    if (arrUser[i].Id === userItem.Id) {
                        return i;
                    }
                }

                return -1;
            };
            this._navigateManager = navigateManager;
            this._service = service;
        }
        UserViewModel.prototype.GoToAddUserCommand = function () {
            var editUserViewModel = new App.EditUserViewModel(new App.User(), this._service, this._navigateManager);
            this._navigateManager.OpenInNewWindow(App.Envirotment.ADD_FORM, editUserViewModel, "ADD USER");
        };

        UserViewModel.prototype.GoToEditUserCommand = function (user) {
            var editUserViewModel = new App.EditUserViewModel(App.createUserFrom(user), this._service, this._navigateManager);
            this._navigateManager.OpenInNewWindow(App.Envirotment.ADD_FORM, editUserViewModel, "EDIT USER");
        };

        UserViewModel.prototype.init = function () {
            var _this = this;
            // message bus
            postal.subscribe(App.Envirotment.USER_WAS_ADDED, function (data) {
                var user = new App.User();
                user.Id = data.Id;
                user.Firstname(data.Firstname);
                user.Lastname(data.Lastname);
                user.IsAdmin(data.IsAdmin);
                user.Status(data.Status);
                user.Pages(data.Pages);
                _this.Users.push(user);
            });

            postal.subscribe(App.Envirotment.USER_WAS_MODIFY, function (data) {
                var index = _this.indexOfUser(data);
                if (index > -1) {
                    var modifyUser = _this.Users()[index];
                    modifyUser.Id = data.Id;
                    modifyUser.Firstname(data.Firstname);
                    modifyUser.Lastname(data.Lastname);
                    modifyUser.IsAdmin(data.IsAdmin);
                    modifyUser.Status(data.Status);
                    modifyUser.Pages(data.Pages);
                }
            });

            postal.subscribe(App.Envirotment.USER_WAS_DELETED, function (deletedUser) {
                var index = _this.indexOfUser(deletedUser);
                if (index > -1) {
                    _this.Users.splice(index, 1);
                }
            });
        };
        return UserViewModel;
    })();
    App.UserViewModel = UserViewModel;
    ;
})(App || (App = {}));
