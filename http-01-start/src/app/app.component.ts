import { PostsService } from "./post.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "./post.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string = null;
  private addPostSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.fetchingPosts();
    this.addPostSubscription = this.postService.addPostSubscription.subscribe(
      (posts) => {
        this.loadedPosts = posts;
      }
    );
    this.errorSubscription = this.postService.error.subscribe(
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }
  ngOnDestroy(): void {
    this.addPostSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postService
      .createAndStorePost(postData.title, postData.content)
      .subscribe(
        () => {
          this.postService.fetchPosts().subscribe((posts) => {
            this.postService.addPostSubscription.next(posts);
          });
        },
        (error) => {
          this.postService.error.next(error.message);
        }
      );
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
      this.postService.addPostSubscription.next([]);
    });
  }

  onFetchPosts() {
    this.fetchingPosts();
  }

  private fetchingPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.postService.error.next(error.message);
      }
    );
  }

  onHandleError() {
    this.postService.error.next(null);
    this.isFetching = false;
  }
}
