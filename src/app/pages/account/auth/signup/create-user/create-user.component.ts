import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { CreateUserFields } from './create-user.fields';
import * as ErrorActions from 'src/app/core/store/actions/error.actions';
import * as AuthActions from 'src/app/core/store/actions/auth.actions';
import { selectError } from 'src/app/core/store/selectors/error.selectors';
import { selectLoading } from 'src/app/core/store/selectors/loading.selectors';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) createUserForm: DynamicFormComponent;

  fields = CreateUserFields;
  error = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private titleService: Title,
    private metaTagService: Meta
  ) {
    this.setUpSEO();

    this.store.pipe( select( selectLoading ) ).subscribe(
      status => {
        this.loading = status;
      }
    );

    // Subscribe to error state
    this.store.dispatch( ErrorActions.clearError() );
    this.store.pipe( select( selectError ) ).subscribe(
      error => {
        if ( error ) {
          this.error = error.error.email ? error.error.email : 'Error occured. Kindly retry';
        }
      }
    );
  }

  setUpSEO() {
    this.titleService.setTitle('Sign Up | Souko');

    this.metaTagService.addTags([
      { name: 'description', content: 'Sign Up Page For Souko' },
      { name: 'keywords', content: 'Sign Up, Sign Up Page, Souko' }
    ]);
  }

  ngOnInit(): void {
  }

  createUser() {
    if ( !this.createUserForm.valid ) {
      this.createUserForm.validateAllFormFields();
      return;
    }

    this.store.dispatch( AuthActions.createUser( { data: { payload: this.createUserForm.value } } ) );
  }

}
