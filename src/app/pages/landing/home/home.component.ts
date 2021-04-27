import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimelineLite, Back } from 'gsap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StoreService } from 'src/app/core/services/store.service';
import { UserService } from 'src/app/core/services/user.service';

declare var moment;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  leftTime = 0;
  countdownConfig;
  launched = false;

  form: FormGroup;

  plans = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private storeService: StoreService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ]
    });
  }

  ngOnInit(): void {
    this.setCountdown();
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

  subscribeToLaunch() {
    this.userService.subscribeToLaunch( this.form.value ).subscribe( data => {
      this.notificationService.success( null, 'Your email has been saved. We will notify you' );
      this.form.reset();
    } );
  }

  setCountdown() {
    let end = moment('2021-5-3');
    var start = moment();

    this.launched = end.isSameOrBefore( start, 'second' );
    if ( !this.launched ) {
      this.countdownConfig = {
        leftTime: end.diff(start, 'seconds'),
        format: 'dd HH:mm:ss'
      };
    }
  }

  runAnimation() {
    let tl1 = new TimelineLite({ defaults: { duration: 1.5 } });
    tl1.to( '#hero-cloud-one', 2.5, { left: '9%', repeat: -1, yoyo: true } );

    let tl2 = new TimelineLite({ defaults: { duration: 1.5 } });
    tl2.to( '#hero-cloud-two', 2.5, { right: '9%', repeat: -1, yoyo: true } );

    let tl3 = new TimelineLite({ defaults: { duration: 1.5 } });
    tl3.to( '#hero-birds', 1.3, { top: '15%', repeat: -1, yoyo: true } );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView( { behavior: 'smooth' } );
  }

}
