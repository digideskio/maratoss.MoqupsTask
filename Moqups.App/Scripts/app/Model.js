var User = function (id, fName, lName) {
    var self = this;
    
    self.Id = id;
    self.Firstname = ko.observable(fName);
    self.Lastname = ko.observable(lName);
    self.Status = ko.observable(1);
    self.IsAdmin = ko.observable();
    self.Pages = ko.observableArray();
};

//User.prototype.toString = function() {
//    return Name;
//};

var Page = function (id, name) {
    var self = this;
    
    self.Id = id;
    self.Name = name;
};

var Status = function(id, value) {
    var self = this;

    self.Id = id;
    self.Value = value;
};

var UserViewModel = function (navigateManager) {
    var self = this;
    
    self.Users = ko.observableArray();
    self.GoToAddUserCommand = function () {
        var user = new User();
        user.Firstname('Firstname');
        user.Lastname('Lastname');

        var editUserViewModel = new EditUserViewModel(user);
        
        $.getJSON('api/statuses')
            .done(function (data) {
                $.each(data, function(key, item) {
                    editUserViewModel.AvaiableStatuses.push(new Status(item.Id, item.Value));
                });
                navigateManager.OpenInNewWindow(editUserViewModel);
            });
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
    self.AvaiableStatuses = [];
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