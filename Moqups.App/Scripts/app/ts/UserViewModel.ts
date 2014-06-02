///<reference path="EditUserViewModel.ts"/>
///<reference path="../../typings/postal.d.ts"/>
///<reference path="Envirotment.ts"/>

module App {
    export class UserViewModel {
        private _navigateManager: NavigationManager;
        private _service: Service;

        constructor(navigateManager: NavigationManager, service: Service) {
            this._navigateManager = navigateManager;
            this._service = service;
        }

        public IsBusy: KnockoutObservable<boolean> = ko.observable(false);
        public Users: KnockoutObservableArray<User> = ko.observableArray<User>();

        public GoToAddUserCommand() {
            var editUserViewModel = new EditUserViewModel(new User(), this._service, this._navigateManager);
            this._navigateManager.OpenInNewWindow(Envirotment.ADD_FORM, editUserViewModel, "ADD USER");
        }

        public GoToEditUserCommand(user) {
            var editUserViewModel = new EditUserViewModel(createUserFrom(user), this._service, this._navigateManager);
            this._navigateManager.OpenInNewWindow(Envirotment.ADD_FORM, editUserViewModel, "EDIT USER");
        }

        private init() {
            // message bus
            postal.subscribe(Envirotment.USER_WAS_ADDED, (data: any) => {
                var user = new User();
                user.Id = data.Id;
                user.Firstname(data.Firstname);
                user.Lastname(data.Lastname);
                user.IsAdmin(data.IsAdmin);
                user.Status(data.Status);
                user.Pages(data.Pages);
                this.Users.push(user);
            });

            postal.subscribe(Envirotment.USER_WAS_MODIFY, data => {
                var index = this.indexOfUser(data);
                if (index > -1) {
                    var modifyUser = this.Users()[index];
                    modifyUser.Id = data.Id;
                    modifyUser.Firstname(data.Firstname);
                    modifyUser.Lastname(data.Lastname);
                    modifyUser.IsAdmin(data.IsAdmin);
                    modifyUser.Status(data.Status);
                    modifyUser.Pages(data.Pages);
                }
            });

            postal.subscribe(Envirotment.USER_WAS_DELETED,
                deletedUser => {
                    var index = this.indexOfUser(deletedUser);
                    if (index > -1) {
                        this.Users.splice(index, 1);
                    }
                });
        }

        private indexOfUser = (userItem: User) => {
            var arrUser = this.Users();
            for (var i = 0; i < arrUser.length; i++) {
                if (arrUser[i].Id === userItem.Id) {
                    return i;
                }
            }

            return -1;
        };
    };
}