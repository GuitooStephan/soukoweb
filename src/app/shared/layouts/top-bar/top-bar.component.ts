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
  menu = new TimelineMax( { ease: Back.easeOut.config(2), paused: true } );

  constructor(
    private modal: NgbModal,
    private notificationService: NotificationService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.createMenuAnim();
  }

  addProduct() {
    const modalRef = this.modal.open(AddProductComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Product added successfully!');
      }
    }, (_) => { });
  }

  createMenuAnim(){
    this.menu.to( '.menu-wrapper', 1, { clipPath: 'circle(100%)' } );
    this.menu.to( '.menu-container', .5, { opacity: 1, y: '30px', stagger: 0.1 }, '-=1' );
  }

  logout() {
    this.store.dispatch( AuthActions.signOut() );
  }

  toggleMenu() {
    this.menu.restart();
  }

}
