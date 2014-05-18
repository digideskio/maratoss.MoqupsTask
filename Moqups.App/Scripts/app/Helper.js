Array.prototype.insertRange = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        this.push(arr[i]);
    }
};

function fillData(model) {
    for (var i = 0; i < 10; i++) {
        var user = new User(i, 'fName: ' + i, 'lName: ' + i);
        user.Pages.push(new Page(1, 'Page 1'));
        user.Pages.push(new Page(2, 'Page 2'));
        model.Users.push(user);

        if (i % 2 == 0) {
            user.IsAdmin(true);
            user.Status(2);
            user.Pages.push(new Page(3, 'Page 3'));
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