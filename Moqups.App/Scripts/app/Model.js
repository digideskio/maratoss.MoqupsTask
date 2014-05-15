var UserViewModel = function (navigateManager) {
    var self = this;

    self.Users = ko.observableArray();
    self.GoToAddUserCommand = function () {
        var editUserViewModel = new EditUserViewModel(new User());
        var service = new Service();

        editUserViewModel.AvaiableStatuses.insertRange(service.getStatuses());
        editUserViewModel.AvaiablePages().insertRange(service.getPages());
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
    self.AvaiableStatuses = [];
    self.AddUserCommand = function () {
        new Service().addUser(User(), null, function(err) {
            alert(err.responseText);
        });
    };
    self.EditUserCommand = function () {
        alert('EditUserCommand');
    };
    self.RemoveUserCommand = function () {
        alert('RemoveUserCommand');
    };
};