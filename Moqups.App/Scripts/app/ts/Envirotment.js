var App;
(function (App) {
    var Envirotment = (function () {
        function Envirotment() {
        }
        Envirotment.USER_WAS_ADDED = 'USER_WAS_ADDED';
        Envirotment.USER_WAS_MODIFY = 'USER_WAS_MODIFY';
        Envirotment.USER_WAS_DELETED = 'USER_WAS_DELETED';
        Envirotment.ADD_FORM = 'Templates/AddForm.html';
        return Envirotment;
    })();
    App.Envirotment = Envirotment;
})(App || (App = {}));
