function InitModel(userViewModel, service) {
    service.getAllUsers(null, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            item.Status = statusConverter.GetStatusById(item.Status);

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