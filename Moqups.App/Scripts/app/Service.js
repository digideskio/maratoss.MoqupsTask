// todo: need async
var Service = function () {
    var self = this;

    self.getAllUsers = function (filter, callback, errorCallback, finnaly) {
        $.ajax({
            type: 'GET',
            url: 'api/users',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: callback,
            error: errorCallback,
            complete: finnaly
        });
    };

    self.getPages = function () {
        var pages = [];
        $.ajax({
            type: 'GET',
            url: 'api/pages',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (key, item) {
                    pages.push(new Page(item.Id, item.Name));
                });
            },
            async: false
        });
        return pages;
    };

    self.getStatuses = function () {
        var statuses = [];
        $.ajax({
            type: 'GET',
            url: 'api/statuses',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (key, item) {
                    statuses.push(new Status(item.Id, item.Value));
                });
            },
            async: false
        });
        return statuses;
    };

    self.SaveOrUpdateUser = function (user, callback, errorCallback, finnaly) {
        var copyUser = createUserFrom(user);
        copyUser.Status = copyUser.Status().Id;
        $.ajax({
            type: 'POST',
            url: 'api/users',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                data.Status = statusConverter.GetStatusById(data.Status);
                callback(data);
            },
            error: errorCallback,
            complete: finnaly,
            data: ko.toJSON(copyUser)
        });
    };

    self.loadForm = function (url) {
        var view;
        $.ajax({
            type: "POST",
            url: url,
            error: function (data) {
                //screen.html(data.responseText);
                alert(data.responseText);
            },
            success: function (data) {
                view = data;
            },
            async: false
        });

        return view;
    };

    self.DeleteUser = function (user, callback, errorCallback, finnaly) {
        $.ajax({
            type: 'DELETE',
            url: 'api/users/' + user.Id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: callback,
            error: errorCallback,
            complete: finnaly
        });
    };
}