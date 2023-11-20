import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { Post } from "../../models/classes/post";
import { PostInfoService } from "../../services/post-info.service";

@Component({
  selector: "app-post-footer",
  templateUrl: "./post-footer.component.html",
  styleUrls: ["./post-footer.component.css"]
})
export class PostFooterComponent implements OnInit, OnChanges {
  @Input() post!: Post;
  @Output() comment: EventEmitter<Post> = new EventEmitter();
  @Output() closed: EventEmitter<void> = new EventEmitter();
  showClose = false;
  showComments = false;

  constructor(private postInfo: PostInfoService) {}

  ngOnInit(): void {
    this.checkPost();
  }

  ngOnChanges(): void {
    this.checkPost();
  }

  checkPost(): void {
    this.showClose = this.closed.observers.length > 0;
    this.showComments = this.comment.observers.length > 0;
    if (this.post === null) {
      throw new Error("Attribute 'post' is required");
    }
  }

  vote(p: Post, dir: number): void {
    this.postInfo.vote(p, dir);
  }

  viewPost(p: Post): void {
    this.comment.next(p);
  }

  closePost(): void {
    this.closed.next();
  }
}
