﻿Array.prototype.insertRange = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        this.push(arr[i]);
    }
};

function InitModel(userViewModel, service) {
    var statuses = service.getStatuses();
    service.getAllUsers(null, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            item.Status = getStatusById(statuses, item.Status);

            var user = new User();
            user.Id = item.Id;
            user.Firstname = ko.observable(item.Firstname);
            user.Lastname = ko.observable(item.Lastname);
            user.Status = ko.observable(item.Status);
            user.IsAdmin = ko.observable(item.IsAdmin);
            user.Pages = ko.observableArray(item.Pages);
            userViewModel.Users.push(user);
        }
    }, function (error) {
        alert(error.responseText);
    });
};

function fillFakeData(model) {
    for (var i = 0; i < 10; i++) {
        var user = new User(i, 'fName: ' + i, 'lName: ' + i);
        user.Status(new Status(1, "Single"));
        user.Pages.push(new Page(1, 'Page1'));
        user.Pages.push(new Page(2, 'Page2'));
        model.Users.push(user);

        if (i % 2 == 0) {
            user.IsAdmin(true);
            user.Status(new Status(0, "Married"));
            user.Pages.push(new Page(3, 'Page3'));
        }
    }
}

function dropSource(item, viewModel) {
    viewModel.AvaiablePages.remove(item);
    viewModel.User().Pages.push(item);
}

function dropTarget(item, viewModel) {
    viewModel.AvaiablePages.push(item);
    viewModel.User().Pages.remove(item);
}

Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.removePage = function (item) {
    var index = indexPageOf(this, item);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.remove = function (array) {
    for (var i = 0; i < array.length; i++) {
        this.remove(array[i]);
    }
};

function exceptPage(sourcePages, secondPages) {
    for (var i = 0; i < secondPages.length; i++) {
        var index = indexPageOf(sourcePages, secondPages[i]);
        if (index > -1) {
            sourcePages.splice(index, 1);
        }
    }

    return sourcePages;
}

function indexPageOf(arr, page) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].Id === page.Id) {
            return i;
        }
    }

    return -1;
}

var getStatusById = function (dict, id) {
    for (var i = 0; i < dict.length; i++) {
        if (dict[i].Id === id) {
            return dict[i];
        }
    }
};