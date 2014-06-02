///<reference path="IViewFactory.ts" />
///<reference path="IViewModel.ts" />
///<reference path="HostScreen.ts" />
var App;
(function (App) {
    var NavigationManager = (function () {
        function NavigationManager(screen, viewFactory) {
            this._screen = screen;
            this._viewFactory = viewFactory;
        }
        NavigationManager.prototype.OpenInNewWindow = function (url, viewModel, title, contract) {
            this.unbind();

            // todo: resolve view and bind to viewmodel
            var view = this.resolveView(url, contract);
            if (view === null) {
                throw "view not found";
            }

            this._currentViewModel = viewModel;
            this.openWindow(view, title);
            ko.applyBindings(viewModel, this._screen.Get());
        };

        NavigationManager.prototype.GoBack = function () {
            // todo: go back;
            this._screen.Close();
            this.unbind();
        };

        NavigationManager.prototype.openWindow = function (view, title) {
            if (screen === null) {
                throw "screen is null";
            }

            this._screen.SetContent(view);
            this._screen.Open(title);
        };

        NavigationManager.prototype.unbind = function () {
            ko.cleanNode(this._screen.Get());
        };

        NavigationManager.prototype.resolveView = function (url, contract) {
            return this._viewFactory.LoadForm(url);
        };
        return NavigationManager;
    })();
    App.NavigationManager = NavigationManager;
})(App || (App = {}));
