import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as AuthActions from 'src/app/core/store/actions/auth.actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { TimelineMax, Back } from 'gsap';
import { AddProductComponent } from 'src/app/pages/dashboard/products/add-product/add-product.component';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {
  selectStore$;
  myStore;

  constructor(
    private modal: NgbModal,
    private notificationService: NotificationService,
    private store: Store<AppState>,
    private translateService: TranslateService
  ) {
    this.selectStore$ = this.store.pipe( select( selectStore ) ).subscribe( data => {
      this.myStore = data;
    } );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.selectStore$.unsubscribe();
  }

  addProduct() {
    this.translateService.get('notificationMessages.productAddedSuccess').subscribe( message => {
      const modalRef = this.modal.open(AddProductComponent, { centered: true, size: 'lg' });
      modalRef.result.then((result) => {
        if (result === 'success') {
          this.notificationService.success(null, message);
        }
      }, (_) => { });
    } );
  }

  logout() {
    this.store.dispatch( AuthActions.signOut() );
  }

  getCustomerLink() {
    this.translateService.get('notificationMessages.linkWasCopiedToClipboard').subscribe( message => {
      this.notificationService.success( null, message );
    } );
    return 'https://souko.me/customer/place-order/' + this.myStore.id + '/select-products';
  }

}
