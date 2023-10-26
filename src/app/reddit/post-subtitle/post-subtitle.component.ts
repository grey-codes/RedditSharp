import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Post } from "../post";

@Component({
  selector: "app-post-subtitle",
  templateUrl: "./post-subtitle.component.html",
  styleUrls: ["./post-subtitle.component.css"]
})
export class PostSubtitleComponent implements OnInit, OnChanges {
  private static readonly redditHosts = [
    'www.reddit.com',
    'old.reddit.com',
    'reddit.com'
  ]
  @Input() post!: Post; // tslint:disable-line: no-input-rename
  isLinkPost?: boolean;

  constructor() {}

  ngOnInit(): void {
    this.checkPost();
  }

  ngOnChanges(): void {
    this.checkPost();
  }

  checkPost(): void {
    if (this.post === null) {
      throw new Error("Attribute 'post' is required");
    }
    const postUrl = this.post.url ? new URL(this.post.url) : undefined;
    this.isLinkPost = postUrl ? !PostSubtitleComponent.redditHosts.includes(postUrl.host) : false;
  }
}
