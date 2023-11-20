import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first } from "rxjs/operators";
import { User } from "../models/classes/user";
import { UserAccount } from "../models/accounts";

@Injectable({
  providedIn: "root"
})
export class UserInfoService {
  private _loading = false;
  userQueue: User[] = [];

  constructor(
    private http: HttpClient  ) {}

  public populateInfo(u: User) {
    this.userQueue.push(u);
    if (this.userQueue.length == 1 && !this._loading) this.performNextRequest();
  }

  private performNextRequest() {
    this._loading = true;
    const u: User = <User>this.userQueue.shift();
    this.http
      .jsonp<UserAccount>(`https://reddit.com/user/${u.name}/about.json?`, "jsonp")
      .pipe(first())
      .subscribe(
        {
         next: (results) => {
            if (results.data.snoovatar_img) {
              u.avatarUrl = results.data.snoovatar_img;
            } else {
              u.avatarUrl = "https://www.redditinc.com/assets/images/site/reddit-logo.png";
            }
            if (this.userQueue.length > 0) 
            {
              this.performNextRequest();
            }
            else {
              this._loading = false;
            }
          },
          error: () => {
            if (this.userQueue.length > 0) this.performNextRequest();
            u.avatarUrl = "https://www.redditinc.com/assets/images/site/reddit-logo.png";
          }
        }
      );
  }
  public clearQueue() {
    this._loading = false;
    this.userQueue = [];
  }
}
