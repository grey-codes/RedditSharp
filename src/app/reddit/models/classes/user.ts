import { BehaviorSubject, Observable } from "rxjs";

// TODO: Replace yet another deprecated model
// Appreciate the thought here, young me, but there is no reason to have a behavior subject involved in any of this
// Defaulting an avatar should be done in a reusable view component.
export class User {
  private _name: string; //3-20 characters; ensure this is validated when coding login. PW must be 6 chars
  private _avatarUrl = "/assets/img/load.svg";
  private _avatarUrl$: BehaviorSubject<string> = new BehaviorSubject<string>(this.avatarUrl);

  constructor(name: string) {
    this._name = name;
  }
  public get name(): string {
    return this._name;
  }
  public get avatarUrl(): string {
    return this._avatarUrl;
  }
  public get avatarUrl$(): Observable<string> {
    return this._avatarUrl$;
  }
  public set avatarUrl(value: string) {
    this._avatarUrl = value;
    this._avatarUrl$.next(this.avatarUrl);
  }
}
