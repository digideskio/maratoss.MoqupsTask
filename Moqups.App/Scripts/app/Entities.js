﻿var User = function (id, fName, lName) {
    var self = this;

    self.Id = id;
    self.Firstname = ko.observable(fName);
    self.Lastname = ko.observable(lName);
    self.Status = ko.observable(1);
    self.IsAdmin = ko.observable();
    self.Pages = ko.observableArray();
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

User.prototype.toJson = function() {
    return {
        'Firstname': this.Firstname(),
        'Lastname': this.Lastname()
    };
};