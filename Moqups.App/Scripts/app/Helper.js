function fillData(model) {
    for (var i = 0; i < 10; i++) {
        var user = new User(i, 'fName: ' + i, 'lName: ' + i);
        user.Pages.push(new Page(1, 'Page 1'));
        user.Pages.push(new Page(2, 'Page 2'));
        model.Users.push(user);

        if (i % 2 == 0) {
            user.Pages.push(new Page(3, 'Page 3'));
        }
    }
}

var NavigateManager = function () {
    var self = this;
    self.OpenInNewWindow = function (viewModel, contract) {
        //todo: download view and bind viewmodel
        var view = $('#dialog');
        $.ajax({
            type: "POST",
            url: 'Home/GetAddForm',
            error: function (data) {
                view.html(data.responseText);
                //alert(data.responseText);
            },
            success: function (data) {
                view.html(data);
                view.dialog({
                    modal: true,
                    title: 'some title',
                    width: 350
                });
                ko.applyBindings(viewModel, view[0]);
                view.dialog();
            }
        });
    };
    self.RegisterView = function (view, viewModel, contract) {
        //todo: register view and viewmodel
    };
};

function getType(val) {
    if (typeof val === 'undefined') return 'undefined';
    if (typeof val === 'object' && !val) return 'null';
    return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}