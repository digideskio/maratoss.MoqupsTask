var Window = function (win, contentPath) {
    var self = this;
    var window = win;
    var container = window.find(contentPath);

    self.SetContent = function (content) {
        if (container === null || container.length === 0) {
            throw "container is not found";
        }
        container.html(content);
    };

    self.Get = function () {
        return window[0];
    };

    self.Close = function () {
        window.modal('hide');
    };

    self.Open = function () {
        window.modal('show');
    };
};