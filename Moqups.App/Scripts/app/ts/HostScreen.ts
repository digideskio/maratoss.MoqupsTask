class HostScreen {
    constructor(win: JQuery, contentPath: string, titlePath: string) {
        this._window = win;
        this._container = win.find(contentPath);
        this._header = win.find(titlePath);
    }

    private _window: JQuery;
    private _container: JQuery;
    private _header: JQuery;

    public SetContent(content) {
        if (this._container === null || this._container.length === 0) {
            throw "container is not found";
        }
        this._container.html(content);
    }

    public Get() {
        return window[0];
    }

    public Close() {
        this._window.modal("hide");
    }

    public Open(title) {
        if (title !== null) {
            this.SetTitle(title);
        }
        this._window.modal("show");
    }

    public SetTitle(title: string) {
        this._header.html(title);
    }
}