import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { OauthService } from "./reddit/oauth.service";

const notLoggedIn = "Already logged in! Redirected...";
const action = "Close";

@Injectable({
  providedIn: "root"
})
export class LoggedOutGuard  {
  constructor(
    private oauth: OauthService,
    private snack: MatSnackBar,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.oauth.getLoggedIn()) {
      this.snack.open(notLoggedIn, action, {
        duration: 2000
      });
      this.router.navigateByUrl("/");
    }
    return !this.oauth.getLoggedIn();
  }
}
