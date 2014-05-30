///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="Entities.ts" />
///<reference path="../..//typings/knockout/knockout.d.ts" />

class EditUserViewModel {
    private _service: Service;
    private _navigationManager: NavigationManager;

    constructor(user: User, service: Service, navigationManager: NavigationManager) {
        this.User(user);
        this._service = service;
        this._navigationManager = navigationManager;
    }

    public IsBusy: KnockoutObservable<boolean> = ko.observable<boolean>(true);
    public User: KnockoutObservable<User> = ko.observable<User>();
    public AvaiablePages: KnockoutObservableArray<Page> = ko.observableArray<Page>();
    public AvaiableStatuses: KnockoutObservableArray<Status> = ko.observableArray<Status>();

    public SaveUserCommand() {
        this.IsBusy(true);
        this._service.SaveOrUpdateUser(this.User(), this.saveOrUpdateIsSuccessful, this.onError, function () {
            this.IsBusy(false);
        });
    }

    public CancelCommand() {
        this._navigationManager.GoBack();
    }

    public RemoveUserCommand() {
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
        }, onError, () => {
                self.IsBusy(false);
            });
    }

    private saveOrUpdateIsSuccessful(userData) {
        var topic = this.User().isCreated() ? USER_WAS_MODIFY : USER_WAS_ADDED;
        postal.publish({
            topic: topic,
            data: userData
        });
        this._navigationManager.GoBack();
    }

    private onError(err) {
        alert(err.responseText);
    }
}