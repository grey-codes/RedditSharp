import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Post } from "../post";
import { PostInfoService } from "../post-info.service";

@Component({
  selector: "app-post-comment",
  templateUrl: "./post-comment.component.html",
  styleUrls: ["./post-comment.component.css"]
})
export class PostCommentComponent implements OnInit, OnChanges {
  @Input() post!: Post; // tslint:disable-line: no-input-rename
  @Input("comment-level") commentLevel = 1;

  public readonly mobileCommentNestLevel = 3;

  constructor(private postInfo: PostInfoService) {}

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
  }

  vote(p: Post, dir: number): void {
    this.postInfo.vote(p, dir);
  }
}
