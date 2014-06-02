///<reference path="../../typings/bootstrap/bootstrap.d.ts" />
var App;
(function (App) {
    var HostScreen = (function () {
        function HostScreen(win, contentPath, titlePath) {
            this._window = win;
            this._container = win.find(contentPath);
            this._header = win.find(titlePath);
        }
        HostScreen.prototype.SetContent = function (content) {
            if (this._container === null || this._container.length === 0) {
                throw "container is not found";
            }
            this._container.html(content);
        };

        HostScreen.prototype.Get = function () {
            return this._window[0];
        };

        HostScreen.prototype.Close = function () {
            this._window.modal("hide");
        };

        HostScreen.prototype.Open = function (title) {
            if (title !== null) {
                this.SetTitle(title);
            }
            this._window.modal("show");
        };

        HostScreen.prototype.SetTitle = function (title) {
            this._header.html(title);
        };
        return HostScreen;
    })();
    App.HostScreen = HostScreen;
})(App || (App = {}));
