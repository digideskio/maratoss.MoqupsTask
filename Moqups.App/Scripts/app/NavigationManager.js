// todo: need refactor
var NavigateManager = function (screen, viewFactory) {
    var currentViewModel;

    var self = this;
    self.OpenInNewWindow = function (url, viewModel, title, contract) {
        unbind();
        //todo: resolve view and bind to viewmodel
        var view = resolveView(url, contract);
        if (view === null) {
            throw "view not found";
        }

        currentViewModel = viewModel;
        openWindow(view, title);
        ko.applyBindings(viewModel, screen.Get());
    };

    self.GoBack = function () {
        // todo: go back;
        screen.Close();
        unbind();
    };

    var openWindow = function (view, title) {
        if (screen === null) {
            throw "screen is null";
        }

        screen.SetContent(view);
        screen.Open(title);
    };

    var unbind = function () {
        ko.cleanNode(screen.Get());
    };

    var resolveView = function (url, contract) {
        return viewFactory.loadForm(url);
    };
};