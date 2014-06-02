var App;
(function (App) {
    (function (Status) {
        Status[Status["Married"] = 0] = "Married";
        Status[Status["Single"] = 1] = "Single";
        Status[Status["Divorced"] = 2] = "Divorced";
    })(App.Status || (App.Status = {}));
    var Status = App.Status;

    var Page = (function () {
        function Page(id, name) {
            this.Id = id;
            this.Name = name;
        }
        return Page;
    })();
    App.Page = Page;

    var User = (function () {
        function User() {
            this.Firstname = ko.observable();
            this.Lastname = ko.observable();
            this.IsAdmin = ko.observable();
            this.Status = ko.observable();
            this.Pages = ko.observableArray();
            this.isCreated = function () {
                return this.Id > 0;
            };
            this.toString = function () {
                return this.Firstname() + " " + this.Lastname();
            };
        }
        return User;
    })();
    App.User = User;

    function createUserFrom(user) {
        var newUser = new User();
        newUser.Id = user.Id;
        newUser.Firstname = ko.observable(user.Firstname());
        newUser.Lastname = ko.observable(user.Lastname());
        newUser.Status = ko.observable(user.Status());
        newUser.IsAdmin = ko.observable(user.IsAdmin());
        newUser.Pages(user.Pages());

        return newUser;
    }
    App.createUserFrom = createUserFrom;
    ;
})(App || (App = {}));
