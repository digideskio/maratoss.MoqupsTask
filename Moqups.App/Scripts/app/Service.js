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
}