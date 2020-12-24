export class User {
    private _name: string;
    private _avatarUrl: string = "https://www.redditinc.com/assets/images/site/reddit-logo.png";
    constructor (name:string) {
        this._name=name;
    }
    public get name():string {
        return this._name;
    }
    public get avatarUrl(): string  {
        return this._avatarUrl;
    }
    public set avatarUrl(value: string ) {
        this._avatarUrl = value;
    }
}