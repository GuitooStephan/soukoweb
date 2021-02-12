import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/core/store/actions/auth.actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { TimelineMax, Back } from 'gsap';
import { AddProductComponent } from 'src/app/pages/dashboard/products/add-product/add-product.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    private modal: NgbModal,
    private notificationService: NotificationService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void { }

  addProduct() {
    const modalRef = this.modal.open(AddProductComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Product added successfully!');
      }
    }, (_) => { });
  }

  logout() {
    this.store.dispatch( AuthActions.signOut() );
  }

}
