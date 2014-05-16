var NavigateManager = function (jqScreen) {
    var currentViewModel;
    var screen = jqScreen;

    var self = this;
    self.OpenInNewWindow = function (url, viewModel, contract) {
        unbind();
        //todo: resolve view and bind to viewmodel
        var view = resolveView(url, contract);
        if (view === null) {
            throw "view not found";
        }
        
        currentViewModel = viewModel;
        openWindow(view);
        ko.applyBindings(viewModel, screen[0]);
    };
//    self.RegisterView = function (viewUrl, viewModelType, contract) {
//        dict.push({ url: viewUrl, type: viewModelType, contract: contract });
//    };

    self.GoBack = function () {
        // todo: go back;
        unbind();
        screen.hide();
    };

    var openWindow = function (view, title) {
        if (screen === null) {
            throw "screen is null";
        }
        screen.html(view);
        screen.dialog({
            modal: true,
            title: 'some title',
            width: 350
        });
    };

    var unbind = function () {
        if (screen[0] !== null) {
            ko.cleanNode(screen[0]);
        }
    };

    var resolveView = function (url, contract) {
        return  loadView(url);
    };

    var loadView = function (url) {
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
};