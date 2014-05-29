///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../..//typings/knockout/knockout.d.ts" />

enum Status { Married = 0, Single = 1, Divorced = 2 }

class Page {
}

class User {
    private _fName: KnockoutObservable<string>;
    private _lName: KnockoutObservable<string>;
    private _isAdmin: KnockoutObservable<boolean>;
    private _status: KnockoutObservable<Status>;
    private _pages: KnockoutObservableArray<Page>;

    setFirstname(fName: string) {
        if (this._fName == null) {
            this._fName = ko.observable(fName);
        } else {
            this._fName(fName);
        }
    }
    getFirstname(): KnockoutObservable<string> {
        return this._fName;
    }

    setLastname(lName: string) {
        if (this._lName == null) {
            this._lName = ko.observable(lName);
        } else {
            this._lName(lName);
        }
    }

    getLastname(): KnockoutObservable<string> {
        return this._lName;
    }
}

class Service {
}

class NavigationManager {
}

class EditUserViewModel {
    _user: User;
    _service: Service;
    _navigationManager: NavigationManager;

    constructor(user: User, service: Service, navigationManager: NavigationManager) {
        this._user = user;
        this._service = service;
        this._navigationManager = navigationManager;
    }
}