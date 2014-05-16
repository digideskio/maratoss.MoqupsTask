// todo: need refactor
var NavigateManager = function (jqScreen, viewFactory) {
    var currentViewModel;

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
        ko.applyBindings(viewModel, jqScreen[0]);
    };

    self.GoBack = function () {
        // todo: go back;
        unbind();
        jqScreen.hide();
    };

    var openWindow = function (view, title) {
        if (jqScreen === null) {
            throw "screen is null";
        }

        jqScreen.html(view);
        jqScreen.dialog({
            modal: true,
            title: 'some title',
            width: 350
        });
    };

    var unbind = function () {
        if (jqScreen[0] !== null) {
            ko.cleanNode(jqScreen[0]);
        }
    };

    var resolveView = function (url, contract) {
        return viewFactory.loadForm(url);
    };
};