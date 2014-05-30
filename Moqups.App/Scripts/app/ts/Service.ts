module App {
    class Service implements IViewFactory {
        public GetAllUsers(
            filter: string,
            callback: (data: string) => any,
            errorCallback: (error: JQueryXHR) => any,
            finnaly: () => any) {
            $.ajax({
                type: "GET",
                url: "api/users",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: callback,
                error: errorCallback,
                complete: finnaly
            });
        }

        public GetPages(
            callback: (data: Array<Page>) => any,
            errorCallback: (error: JQueryXHR) => any,
            finnaly: () => any) {
            $.ajax({
                type: 'GET',
                url: 'api/pages',
                dataType: 'json',
                complete: finnaly,
                error: errorCallback,
                success: data => {
                    var pages = new Array<Page>();
                    $.each(data, (key, item) => {
                        pages.push(new Page(item.Id, item.Name));
                    });
                    callback(pages);
                }
            });
        }

        public SaveOrUpdateUser(user, callback, errorCallback, finnaly) {
            var copyUser = this.createUserFrom(user);
            //copyUser.Status = copyUser.Status();
            $.ajax({
                type: 'POST',
                url: 'api/users',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: data => {
                    data.Status = data.Status;
                    callback(data);
                },
                error: errorCallback,
                complete: finnaly,
                data: ko.toJSON(copyUser)
            });
        }

        public LoadForm(url: string) {
            var view;
            $.ajax({
                type: "GET",
                url: url,
                error: data => {
                    alert(data.responseText);
                },
                success: data => {
                    view = data;
                },
                async: false,
                dataType: 'html',
                cache: false
            });

            return view;
        }

        public DeleteUser(user, callback, errorCallback, finnaly) {
            $.ajax({
                type: 'DELETE',
                url: 'api/users/' + user.Id,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: callback,
                error: errorCallback,
                complete: finnaly
            });
        }

        private createUserFrom(user: User): User {
            var newUser = new User();
            newUser.Id = user.Id;
            newUser.Firstname = ko.observable(user.Firstname());
            newUser.Lastname = ko.observable(user.Lastname());
            newUser.Status = ko.observable(user.Status());
            newUser.IsAdmin = ko.observable(user.IsAdmin());
            newUser.Pages = ko.observableArray(user.Pages());

            return newUser;
        }
    }
}