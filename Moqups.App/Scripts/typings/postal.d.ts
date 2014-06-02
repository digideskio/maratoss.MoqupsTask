interface IPostalStatic {
    publish(topic: string, data: any);
    subscribe(topic: string, callback: (data: any) => void);
}

declare module "postal" {
    export = postal;
}

declare var postal: IPostalStatic;