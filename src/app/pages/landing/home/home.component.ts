import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { CountdownComponent, CountdownFormatFn } from 'ngx-countdown';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StoreService } from 'src/app/core/services/store.service';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  plans = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private storeService: StoreService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchPlans();
  }

  ngAfterViewInit(): void {
    this.runAnimation();
  }

  fetchPlans() {
    this.storeService.fetchSubscriptionPlans().subscribe( data => {
      this.plans = data.results;
    } );
  }

  runAnimation() {
    gsap.to( '#hero-cloud-one', { duration: 2.5, left: '9%', repeat: -1, yoyo: true } );
    gsap.to( '#hero-cloud-two', { duration: 2.5, right: '9%', repeat: -1, yoyo: true } );
    gsap.to( '#hero-birds', { duration: 1.3, top: '15%', repeat: -1, yoyo: true } );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView( { behavior: 'smooth' } );
  }

}
