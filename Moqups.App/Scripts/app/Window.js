var Window = function (win, contentPath, titlePath) {
    var self = this;
    var window = win;
    var container = window.find(contentPath);
    var header = window.find(titlePath);

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

    self.Open = function (title) {
        header.html(title);
        window.modal('show');
    };
};