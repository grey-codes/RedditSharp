import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
//Angular Material Components
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticateComponent } from "./auth/pages/authenticate/authenticate.component";
import { CallbackPipePipe } from "./core/pipes/callback-pipe.pipe";
import { DashboardComponent } from "./reddit/pages/dashboard/dashboard.component";
import { LoggedInGuard } from "./auth/guards/logged-in-guard.guard";
import { LoggedOutGuard } from "./auth/guards/logged-out-guard.guard";
import { LoginComponent } from "./auth/pages/login/login.component";
import { LogoutComponent } from "./auth/pages/logout/logout.component";
import { PostCommentComponent } from "./reddit/components/post-comment/post-comment.component";
import { PostFooterComponent } from "./reddit/components/post-footer/post-footer.component";
import { PostSubtitleComponent } from "./reddit/components/post-subtitle/post-subtitle.component";
import { PostVoteComponent } from "./reddit/components/post-vote/post-vote.component";
import { SafeHTMLPipe } from "./core/pipes/safe-html.pipe";
import { SortPipePipe } from "./core/pipes/sort-pipe.pipe";
import { PostModalComponent } from "./reddit/components/post-modal/post-modal.component";
import { SubredditModalComponent } from "./reddit/components/subreddit-modal/subreddit-modal.component";
import { ResultModalComponent } from "./reddit/pages/submit/result-modal/result-modal.component";
import { SubmitComponent } from "./reddit/pages/submit/submit.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    PostModalComponent,
    SafeHTMLPipe,
    AuthenticateComponent,
    CallbackPipePipe,
    SortPipePipe,
    PostSubtitleComponent,
    PostCommentComponent,
    PostFooterComponent,
    PostVoteComponent,
    SubmitComponent,
    ResultModalComponent,
    SubredditModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    //Angular Material
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [LoggedInGuard, LoggedOutGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
