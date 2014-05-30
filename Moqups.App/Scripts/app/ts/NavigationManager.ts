interface IViewModel {
}

class NavigationManager {
    private _currentViewModel: IViewModel;
    private _screen: HostScreen;
    private _viewFactory: IViewFactory;

    constructor(screen: HostScreen, viewFactory: IViewFactory) {
        this._screen = screen;
        this._viewFactory = viewFactory;
    }

    public OpenInNewWindow(url, viewModel: IViewModel, title?: string, contract?: string) {
        this.unbind();
        // todo: resolve view and bind to viewmodel
        var view = this.resolveView(url, contract);
        if (view === null) {
            throw "view not found";
        }

        this._currentViewModel = viewModel;
        this.openWindow(view, title);
        ko.applyBindings(viewModel, this._screen.Get());
    }

    public GoBack() {
        // todo: go back;
        this._screen.Close();
        this.unbind();
    }

    private openWindow(view, title) {
        if (screen === null) {
            throw "screen is null";
        }

        this._screen.SetContent(view);
        this._screen.Open(title);
    }

    private unbind() {
        ko.cleanNode(this._screen.Get());
    }

    private resolveView(url, contract) {
        return this._viewFactory.LoadForm(url);
    }
}