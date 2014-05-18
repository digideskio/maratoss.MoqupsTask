var User = function (id, fName, lName) {
    var self = this;

    self.Id = id;
    self.Firstname = ko.observable(fName);
    self.Lastname = ko.observable(lName);
    self.Status = ko.observable(1);
    self.IsAdmin = ko.observable();
    self.Pages = ko.observableArray();
};

function createUserFrom(user) {
    var newUser = new User();
    newUser.Id = user.Id;
    newUser.Firstname = ko.observable(user.Firstname());
    newUser.Lastname = ko.observable(user.Lastname());
    newUser.Status = ko.observable(user.Status());
    newUser.IsAdmin = ko.observable(user.IsAdmin());
    newUser.Pages = ko.observableArray(user.Pages());

    return newUser;
};

User.prototype.toString = function() {
    return this.Firstname() + " " + this.Lastname();
};

var Page = function (id, name) {
    var self = this;

    self.Id = id;
    self.Name = name;
};

var Status = function (id, value) {
    var self = this;

    self.Id = id;
    self.Value = value;
};

Status.prototype.toString = function () {
    return this.Value;
};