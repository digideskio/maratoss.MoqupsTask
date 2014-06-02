module App {
    export enum Status { Married = 0, Single = 1, Divorced = 2 }

    export class Page {
        constructor(id: number, name: string) {
            this.Id = id;
            this.Name = name;
        }

        public Id: number;
        public Name: string;
    }

    export class User {
        public Id: number;
        public Firstname: KnockoutObservable<string> = ko.observable<string>();
        public Lastname: KnockoutObservable<string> = ko.observable<string>();
        public IsAdmin: KnockoutObservable<boolean> = ko.observable<boolean>();
        public Status: KnockoutObservable<Status> = ko.observable<Status>();
        public Pages: KnockoutObservableArray<Page> = ko.observableArray<Page>();

        public isCreated = function () {
            return this.Id > 0;
        };

        public toString = function () {
            return this.Firstname() + " " + this.Lastname();
        };
    }

    export function createUserFrom(user) {
        var newUser = new User();
        newUser.Id = user.Id;
        newUser.Firstname = ko.observable(user.Firstname());
        newUser.Lastname = ko.observable(user.Lastname());
        newUser.Status = ko.observable(user.Status());
        newUser.IsAdmin = ko.observable(user.IsAdmin());
        newUser.Pages(user.Pages());

        return newUser;
    };
}