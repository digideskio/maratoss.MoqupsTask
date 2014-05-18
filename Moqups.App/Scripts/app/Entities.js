var User = function (id, fName, lName) {
    var self = this;

    self.Id = id;
    self.Firstname = ko.observable(fName);
    self.Lastname = ko.observable(lName);
    self.Status = ko.observable(1);
    self.IsAdmin = ko.observable();
    self.Pages = ko.observableArray();
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