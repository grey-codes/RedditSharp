import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, debounceTime, map, startWith, switchMap, take } from "rxjs/operators";
import { RedditFeedService } from "../services/reddit-feed.service";

function isEmpty(value: any): boolean {
  return value === null || value.length === 0;
}

@Injectable({
  providedIn: "root"
})
export class SubredditValidatorService {
  constructor(private rfs: RedditFeedService) {}
  getValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (isEmpty(control.value)) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          startWith(""),
          debounceTime(200),
          take(1),
          switchMap((x: unknown) => {
            const s = `${x}`;
            return this.rfs.fetchPosts(s).pipe(
              map(() => null),
              catchError(() => {
                return of({
                  sub: "Subreddit does not exist"
                });
              }),
              take(1)
            );
          })
        );
      }
    };
  }
}
