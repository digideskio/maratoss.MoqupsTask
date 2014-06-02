module App {
    export class Service implements IViewFactory {
        public GetAllUsers(
            filter: string,
            callback: (data: Array<User>) => void,
            errorCallback?: (error: JQueryXHR) => void,
            finnaly?: () => void) {
            $.ajax({
                type: "GET",
                url: "api/users",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: data => {
                    var users = new Array<User>();
                    $.each(data, (key, item) => {
                        var user = new User();
                        user.Id = item.Id;
                        user.Firstname(item.Firstname);
                        user.Lastname(item.Lastname);
                        user.IsAdmin(item.IsAdmin);
                        user.Pages(item.Pages);
                        user.Status(item.Status);
                        users.push(user);
                    });
                    callback(users);
                },
                error: errorCallback,
                complete: finnaly
            });
        }

        public GetPages(
            callback: (data: Array<Page>) => void,
            errorCallback: (error: JQueryXHR) => void,
            finnaly: () => void) {
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