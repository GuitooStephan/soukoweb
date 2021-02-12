import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectLoading } from 'src/app/core/store/selectors/loading.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { SignInFields } from './signin.fields';
import * as ErrorActions from 'src/app/core/store/actions/error.actions';
import * as AuthActions from 'src/app/core/store/actions/auth.actions';
import { selectError } from 'src/app/core/store/selectors/error.selectors';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: false }) signInForm: DynamicFormComponent;

  fields = SignInFields;
  error = '';
  loading = false;

  selectError$;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
    private notificationService: NotificationService
  ) {
    this.setUpSEO();

    this.store.pipe( select( selectLoading ) ).subscribe(
      status => {
        this.loading = status;
      }
    );

    // Subscribe to error state
    this.store.dispatch( ErrorActions.clearError() );
    this.selectError$ = this.store.pipe( select( selectError ) ).subscribe(
      error => {
        if ( error ) {
          this.notificationService.error( null, 'Kindly check your credentials and retry' );
        }
      }
    );
  }

  setUpSEO() {
    this.titleService.setTitle('Sign In | Souko');

    this.metaTagService.addTags([
      { name: 'description', content: 'Sign In Page For Souko' },
      { name: 'keywords', content: 'Sign In, Sign In Page, Souko' }
    ]);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectError$.unsubscribe();
  }

  signIn() {
    if ( !this.signInForm.valid ) {
      this.signInForm.validateAllFormFields();
      return;
    }

    this.store.dispatch( AuthActions.signIn( { data: {  payload: this.signInForm.value, returnUrl: this.getReturnUrl() } } ) );
  }

  getReturnUrl( defaultUrl= '/' ) {
    // tslint:disable-next-line: no-string-literal
    return this.route.snapshot.queryParams['returnUrl'] || defaultUrl;
  }

}
