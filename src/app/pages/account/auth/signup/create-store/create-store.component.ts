import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectLoading } from 'src/app/core/store/selectors/loading.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { CreateStoreFields } from './create-store.fields';
import * as ErrorActions from 'src/app/core/store/actions/error.actions';
import * as StoreActions from 'src/app/core/store/actions/store.actions';
import * as AuthActions from 'src/app/core/store/actions/auth.actions';
import { selectError } from 'src/app/core/store/selectors/error.selectors';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Categories } from 'src/app/core/common/options/categories.options';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';

declare var _: any;

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: false }) createUserForm: DynamicFormComponent;

  fields = CreateStoreFields;
  error = '';
  loading = false;
  user: any;

  selectError$;
  selectUser$;
  selectLoading$;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private categoriesService: CategoriesService,
    private store: Store<AppState>,
    private titleService: Title,
    private metaTagService: Meta
  ) {
    this.setUpSEO();

    this.selectLoading$ = this.store.pipe( select( selectLoading ) ).subscribe(
      status => {
        this.loading = status;
      }
    );

    this.selectUser$ = this.store.pipe( select( selectUser ) ).subscribe(
      user => {
        if ( user ) {
          this.user = user;
        }
      }
    );

    // Subscribe to error state
    this.store.dispatch( ErrorActions.clearError() );
    this.selectError$ = this.store.pipe( select( selectError ) ).subscribe(
      error => {
        if ( error ) {
          this.error = 'Error occured. Kindly retry';
        }
      }
    );
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  ngOnDestroy(): void {
    this.selectError$.unsubscribe();
    this.selectUser$.unsubscribe();
    this.selectLoading$.unsubscribe();
  }

  setUpSEO() {
    this.titleService.setTitle('Create Store | Souko');

    this.metaTagService.addTags([
      { name: 'description', content: 'Create Store Page For Souko' },
      { name: 'keywords', content: 'Sign Up, Create Store, Souko' }
    ]);
  }

  fetchCategories() {
    this.categoriesService.fetchCategories().subscribe(
      data => {
        const categories = data.results;
        // tslint:disable-next-line: max-line-length
        Categories.push( ..._.xorBy( _.filter(Categories, i => i.value !== ''), categories.map( i => ({ label: i.name, value: i.id }) ), 'value') );
      }
    );
  }

  createStore() {
    if ( !this.createUserForm.valid ) {
      this.createUserForm.validateAllFormFields();
      return;
    }

    const value = this.createUserForm.value;
    if ( ! ( typeof value.phone_number === 'string' )  ) {
      value.phone_number = value.phone_number.e164Number;
    }

    const payload = { user_id: this.user.id, ..._.pickBy( {...value} , _.identity) };
    this.store.dispatch( StoreActions.createStore( { data: { payload } } ) );
  }

  signOut() {
    this.store.dispatch( AuthActions.signOut() );
  }

}
