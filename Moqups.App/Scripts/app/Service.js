var Service = function () {
    this.getPages = function () {
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

    this.getStatuses = function () {
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

    this.addUser = function (user, callback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: 'api/users',
            dataType: 'json',
            success: callback,
            error: errorCallback,
            data: user
        });
    };

    this.loadForm = function (url) {
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
}