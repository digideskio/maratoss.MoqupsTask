var App;
(function (App) {
    var Service = (function () {
        function Service() {
        }
        Service.prototype.GetAllUsers = function (filter, callback, errorCallback, finnaly) {
            $.ajax({
                type: "GET",
                url: "api/users",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: callback,
                error: errorCallback,
                complete: finnaly
            });
        };

        Service.prototype.GetPages = function (callback, errorCallback, finnaly) {
            $.ajax({
                type: 'GET',
                url: 'api/pages',
                dataType: 'json',
                complete: finnaly,
                error: errorCallback,
                success: function (data) {
                    var pages = new Array();
                    $.each(data, function (key, item) {
                        pages.push(new Page(item.Id, item.Name));
                    });
                    callback(pages);
                }
            });
        };

        Service.prototype.SaveOrUpdateUser = function (user, callback, errorCallback, finnaly) {
            var copyUser = this.createUserFrom(user);

            //copyUser.Status = copyUser.Status();
            $.ajax({
                type: 'POST',
                url: 'api/users',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    data.Status = data.Status;
                    callback(data);
                },
                error: errorCallback,
                complete: finnaly,
                data: ko.toJSON(copyUser)
            });
        };

        Service.prototype.LoadForm = function (url) {
            var view;
            $.ajax({
                type: "GET",
                url: url,
                error: function (data) {
                    alert(data.responseText);
                },
                success: function (data) {
                    view = data;
                },
                async: false,
                dataType: 'html',
                cache: false
            });

            return view;
        };

        Service.prototype.DeleteUser = function (user, callback, errorCallback, finnaly) {
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

        Service.prototype.createUserFrom = function (user) {
            var newUser = new User();
            newUser.Id = user.Id;
            newUser.Firstname = ko.observable(user.Firstname());
            newUser.Lastname = ko.observable(user.Lastname());
            newUser.Status = ko.observable(user.Status());
            newUser.IsAdmin = ko.observable(user.IsAdmin());
            newUser.Pages = ko.observableArray(user.Pages());

            return newUser;
        };
        return Service;
    })();
})(App || (App = {}));
