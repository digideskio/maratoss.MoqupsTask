var User = function (id, fName, lName) {
    var self = this;

    self.Id = id;
    self.Firstname = ko.observable(fName);
    self.Lastname = ko.observable(lName);
    self.Status = ko.observable(1);
    self.IsAdmin = ko.observable();
    self.Pages = ko.observableArray();
};

User.prototype.createUser = function (user) {
    this.Id = user.Id;
    this.Firstname = ko.observable(user.Firstname());
    this.Lastname = ko.observable(user.Lastname());
    this.Status = ko.observable(user.Status());
    this.IsAdmin = ko.observable(user.IsAdmin());
    this.Pages = ko.observableArray(user.Pages);
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