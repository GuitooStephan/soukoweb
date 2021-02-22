import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { Categories } from 'src/app/core/common/options/categories.options';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StoreService } from 'src/app/core/services/store.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import * as StoreActions from 'src/app/core/store/actions/store.actions';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { MyStoreFields } from './my-store.fields';

declare var _: any;

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DynamicFormComponent, { static: false }) myStoreForm: DynamicFormComponent;
  fields = MyStoreFields;

  selectStore$;
  myStore;

  loading = false;

  constructor(
    private store: Store<AppState>,
    private categoriesService: CategoriesService,
    private notificationService: NotificationService,
    private storeService: StoreService
  ) {
    this.fetchCategories();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loading = true;
    this.selectStore$ = this.store.pipe( select( selectStore ) )
    .pipe( first() )
    .subscribe(
      data => {
        this.myStore = data;
        this.myStoreForm.setValue( data );
        setTimeout(() => {
          this.myStoreForm.setValue( {  categories_ids: data.categories.map( c => c.id ) } );
        }, 1000);
        this.loading = false;
      }
    );
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

  ngOnDestroy(): void {
    this.selectStore$.unsubscribe();
  }

  updateStore() {
    if ( !this.myStoreForm.valid ) {
      this.myStoreForm.validateAllFormFields();
      return;
    }

    const value = this.myStoreForm.value;
    if ( ! ( typeof value.phone_number === 'string' )  ) {
      value.phone_number = value.phone_number.e164Number;
    }

    this.storeService.updateStore( this.myStore.id, value ).subscribe(
      data => {
        this.notificationService.success( null, 'Store updated.' );
        this.store.dispatch( StoreActions.fetchStore( { data: { storeId: this.myStore.id } } ) );
      }
    );
  }

}
