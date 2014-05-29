var User = (function () {
    function User() {
    }
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
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
