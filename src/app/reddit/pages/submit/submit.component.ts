import { Component, OnDestroy, OnInit } from "@angular/core";
import { AsyncValidatorFn, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { PostDataService, SubmissionType, SubmitFormControl, SubmitFormData } from "./postdata.service";
import { ResultModalComponent } from "./result-modal/result-modal.component";
import { OauthService } from "src/app/auth/services/oauth.service";
import { AlphaUnderValidator } from "src/app/core/validators/alpha-under-validator";
import { URLValidator } from "src/app/core/validators/url-validator";
import { RedditFeedService } from "../../services/reddit-feed.service";
import { RequirementValidatorService } from "../../validators/requirement-validator.service";
import { SubredditValidatorService } from "../../validators/subreddit-validator.service";

// TODO: just refactor the whole thing. 
// We can keep it reactive for fun, but please...
@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"]
})
export class SubmitComponent implements OnInit, OnDestroy {
  SubmissionType = SubmissionType;
  firstFormGroup!: UntypedFormGroup;
  secondFormGroup!: UntypedFormGroup;
  thirdFormGroup!: UntypedFormGroup;
  secondFormData!: SubmitFormControl[];
  postData: PostDataService;

  val1: any;
  val2: any;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _postData: PostDataService,
    private _redditFeed: RedditFeedService,
    private _oauth: OauthService,
    private dialog: MatDialog,
    private _subVal: SubredditValidatorService,
    private _reqVal: RequirementValidatorService,
    private _ar: ActivatedRoute
  ) {
    this.postData = this._postData;
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      postType: [this.postData.type, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      tags: [""]
    });
    this.val1 = this.firstFormGroup.value;
    this.firstFormGroup.get("postType")?.valueChanges.subscribe((val: string) => {
      if ((<any[]>Object.values(SubmissionType)).includes(val)) {
        this._postData.type = <SubmissionType>val;
        this.val1 = this.firstFormGroup.value;
      }
    });
    this.postData.submitFormData$.subscribe((data: SubmitFormControl[]) => {
      this.secondFormData = data;
      const formGroup: { [name: string]: UntypedFormControl } = {};

      data.forEach((formControl) => {
        let val = "";
        if (formControl.parameter) {
          const param = this._ar.snapshot.paramMap.get(formControl.parameter);
          if (param) {
            val = param;
          }
        }

        const validators: ValidatorFn[] = [];
        const validatorsAsync: AsyncValidatorFn[] = [];

        if (formControl.validators) {
          if (formControl.validators.required) {
            validators.push(Validators.required);
          }
          if (formControl.validators.minLength) {
            validators.push(Validators.minLength(formControl.validators.minLength));
          }
          if (formControl.validators.maxLength) {
            validators.push(Validators.maxLength(formControl.validators.maxLength));
          }
          if (formControl.validators.url) {
            validators.push(URLValidator);
          }
          if (formControl.validators.email) {
            validators.push(Validators.email);
          }
          if (formControl.validators.alphaunder) {
            validators.push(AlphaUnderValidator);
          }
          if (formControl.validators.subreddit) {
            validatorsAsync.push(this._subVal.getValidator());
          }
        }

        formGroup[formControl.controlName] = new UntypedFormControl(val, validators, validatorsAsync);
      });

      this.secondFormGroup = new UntypedFormGroup(formGroup, null, this._reqVal.getValidator());
      this.val2 = this.secondFormGroup.value; //cache
    });
  }

  getErrorMessage(fg: UntypedFormGroup, controlName: string): string {
    const c = fg.get(controlName);
    if (!c) {
      return "Invalid control";
    }
    if (c.hasError("required")) {
      return "Required.";
    }
    if (c.hasError("minlength")) {
      return "Too short.";
    }
    if (c.hasError("maxlength")) {
      return "Too long.";
    }
    if (c.hasError("blacklist")) {
      return c.getError("blacklist");
    }
    if (c.hasError("whitelist")) {
      return c.getError("whitelist");
    }
    if (c.hasError("invalidText")) {
      return "Contains invalid characters";
    }
    if (c.hasError("email")) {
      return "Not a valid EMail";
    }
    if (c.hasError("url")) {
      return "Not a valid URL";
    }
    if (c.hasError("sub")) {
      return c.getError("sub");
    }
    return "Generic error.";
  }

  getSubreddit(): string | null {
    return this._ar.snapshot.paramMap.get("subreddit");
  }

  getReturnLink(): string[] {
    const sub: string | null = this.getSubreddit();
    if (sub) {
      return ["/r", sub];
    }
    return ["/dashboard"];
  }

  resetForms(): void {
    this.firstFormGroup.patchValue(this.val1);
    this.secondFormGroup.patchValue(this.val2);
    this.firstFormGroup.markAsPristine();
    this.secondFormGroup.markAsPristine();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    const data: SubmitFormData = {
      type: this.firstFormGroup.get("postType")?.value,
      title: "",
      sr: ""
    };
    this.secondFormData.forEach((v: SubmitFormControl) => {
      const ctrl = this.secondFormGroup.get(v.controlName);
      if (!ctrl) return;
      switch (v.field) {
        // TODO: geez, what?? ditch this massive switch statement. 
        // I have no idea why I had this, but we definitely don't need it with typed forms and such.
        case "title":
          data.title = ctrl?.value;
          break;
        case "sr":
          data.sr = ctrl?.value;
          break;
        case "type":
          data.type = ctrl?.value;
          break;
        case "text":
          data.text = ctrl?.value;
          break;
        case "url":
          data.url = ctrl?.value;
          break;
        case "nsfw":
          data.nsfw = ctrl?.value;
          break;
        case "resubmit":
          data.resubmit = ctrl?.value;
          break;
        case "sendreplies":
          data.sendreplies = ctrl?.value;
          break;
        case "spoiler":
          data.spoiler = ctrl?.value;
          break;
      }
    });
    const tagComponent = this.thirdFormGroup.get("tags");
    if (tagComponent) {
      const val = tagComponent.value;
      if (Array.isArray(val)) {
        for (const tag of val) {
          switch (tag) {
            case "spoiler":
              data.spoiler = true;
              break;
            case "sendreplies":
              data.sendreplies = true;
              break;
            case "nsfw":
              data.nsfw = true;
              break;
            case "resubmit":
              data.resubmit = true;
              break;
          }
        }
      }
    }
    data.resubmit = true; //maybe just always resubmit, why not
    if (data.type && data.title && this._oauth.getReady()) {
      this._redditFeed.submitPost(data).subscribe((res: any) => {
        this.dialog.open(ResultModalComponent, {
          autoFocus: false,
          data: {
            results: res.json,
            subreddit: this.getSubreddit(),
            returnLink: this.getReturnLink()
          }
        });
      });
    }
  }
}
