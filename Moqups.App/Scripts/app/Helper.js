Array.prototype.insertRange = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        this.push(arr[i]);
    }
};

function fillData(model) {
    for (var i = 0; i < 10; i++) {
        var user = new User(i, 'fName: ' + i, 'lName: ' + i);
        user.Pages.push(new Page(1, 'Page 1'));
        user.Pages.push(new Page(2, 'Page 2'));
        model.Users.push(user);

        if (i % 2 == 0) {
            user.Pages.push(new Page(3, 'Page 3'));
        }
    }
}

ko.bindingHandlers.clickAndStop = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var handler = ko.utils.unwrapObservable(valueAccessor()),
            newValueAccessor = function () {
                return function (data, event) {
                    handler.call(viewModel, data, event);
                    event.cancelBubble = true;
                    if (event.stopPropagation) event.stopPropagation();
                };
            };

        ko.bindingHandlers.click.init(element, newValueAccessor, allBindingsAccessor, viewModel, context);
    }
};