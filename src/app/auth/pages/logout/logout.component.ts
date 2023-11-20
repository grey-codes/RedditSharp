import { Component, OnInit } from "@angular/core";
import { OauthService } from "../../services/oauth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {
  constructor(private oauth: OauthService) {}

  ngOnInit(): void {
    this.oauth.logOut();
  }
}
