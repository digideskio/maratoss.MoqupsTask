///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../..//typings/knockout/knockout.d.ts" />
var Status;
(function (Status) {
    Status[Status["Married"] = 0] = "Married";
    Status[Status["Single"] = 1] = "Single";
    Status[Status["Divorced"] = 2] = "Divorced";
})(Status || (Status = {}));

var Page = (function () {
    function Page() {
    }
    return Page;
})();

var User = (function () {
    function User() {
    }
    User.prototype.setFirstname = function (fName) {
        if (this._fName == null) {
            this._fName = ko.observable(fName);
        } else {
            this._fName(fName);
        }
    };
    User.prototype.getFirstname = function () {
        return this._fName;
    };

    User.prototype.setLastname = function (lName) {
        if (this._lName == null) {
            this._lName = ko.observable(lName);
        } else {
            this._lName(lName);
        }
    };

    User.prototype.getLastname = function () {
        return this._lName;
    };
    return User;
})();

var Service = (function () {
    function Service() {
    }
    return Service;
})();

var NavigationManager = (function () {
    function NavigationManager() {
    }
    return NavigationManager;
})();

var EditUserViewModel = (function () {
    function EditUserViewModel(user, service, navigationManager) {
        this._user = user;
        this._service = service;
        this._navigationManager = navigationManager;
    }
    return EditUserViewModel;
})();
