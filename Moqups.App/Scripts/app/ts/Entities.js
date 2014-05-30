var Status;
(function (Status) {
    Status[Status["Married"] = 0] = "Married";
    Status[Status["Single"] = 1] = "Single";
    Status[Status["Divorced"] = 2] = "Divorced";
})(Status || (Status = {}));

var Page = (function () {
    function Page(id, name) {
        this.Id = id;
        this.Name = name;
    }
    return Page;
})();

var User = (function () {
    function User() {
        this.Firstname = ko.observable();
        this.Lastname = ko.observable();
        this.IsAdmin = ko.observable();
        this.Status = ko.observable();
        this.Pages = ko.observableArray();
    }
    return User;
})();
