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
    }
}