import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Categories } from 'src/app/core/common/options/categories.options';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StoreService } from 'src/app/core/services/store.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { MyStoreFields } from '../my-store.fields';
import * as StoreActions from 'src/app/core/store/actions/store.actions';
import { UpdateLogoComponent } from '../update-logo/update-logo.component';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';

declare var _: any;

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: false }) myStoreForm: DynamicFormComponent;
  fields = MyStoreFields;

  selectStore$;
  myStore;

  loading = false;

  constructor(
    private store: Store<AppState>,
    private categoriesService: CategoriesService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private storeService: StoreService,
    private modal: NgbModal
  ) {
    this.fetchCategories();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loading = true;
    this.selectStore$ = this.store.pipe( select( selectStore ) )
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

    combineLatest([
      this.translateService.get('notificationMessages.storeUpdated'),
      this.storeService.updateStore( this.myStore.id, value )
    ]).subscribe(
      ([message, data]) => {
        this.notificationService.success( null, message );
        this.store.dispatch( StoreActions.fetchStore( { data: { storeId: this.myStore.id } } ) );
      }
    );
  }

  updateLogo() {
    const modalRef = this.modal.open(UpdateLogoComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.storeId = this.myStore.id;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.translateService.get('notificationMessages.storeLogoUpdated').subscribe( message => {
          this.notificationService.success( null, message );
          this.store.dispatch( StoreActions.fetchStore( { data: { storeId: this.myStore.id } } ) );
        } );
      }
    }, (_) => { });
  }

}
