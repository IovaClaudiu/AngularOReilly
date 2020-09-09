import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  addPostSubscription: Subject<Post[]> = new Subject();
  error: Subject<string> = new Subject();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    return this.http.post<{ name: string }>(
      "https://ng-complete-guide-8977c.firebaseio.com/posts.json",
      postData,
      {
        observe: "body",
      }
    );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://ng-complete-guide-8977c.firebaseio.com/posts.json",
        {
          params: new HttpParams().set("print", "pretty"),
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete("https://ng-complete-guide-8977c.firebaseio.com/posts.json", {
        observe: "events",
        responseType: "json",
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            console.log("Sent");
          }
        })
      );
  }
}
