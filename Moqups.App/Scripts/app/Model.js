var User = function (id, fName, lName) {
    var self = this;
    self.Id = id;
    self.Firstname = ko.observable(fName);
    self.Lastname = ko.observable(lName);
    self.Status = ko.observable(1);
    self.Pages = ko.observableArray();
};

var Page = function (id, name) {
    var self = this;
    self.Id = id;
    self.Name = name;
};

var UserViewModel = function (navigateManager) {
    var self = this;
    self.Users = ko.observableArray();
    self.GoToAddUserCommand = function () {
        var user = new User();
        var editUserViewModel = new EditUserViewModel(user);
        navigateManager.OpenInNewWindow(editUserViewModel);
    };
    self.GoToEditUserCommand = function (newUser) {
        alert('GoToEditUserCommand');
    };
    self.DeleteUserCommand = function (id) {
        alert('DeleteUserCommand');
    };
};

var EditUserViewModel = function (user) {
    var self = this;
    self.User = ko.observable(user);
    self.AvaiablePages = ko.observableArray();
    self.AddUserCommand = function () {
        alert('AddUserCommand');
    };
    self.EditUserCommand = function () {
        alert('EditUserCommand');
    };
    self.RemoveUserCommand = function () {
        alert('RemoveUserCommand');
    };
}