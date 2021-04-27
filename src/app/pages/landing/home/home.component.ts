import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { CountdownFormatFn } from 'ngx-countdown';
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
  countdownConfig = {
    leftTime: 30,
    format: 'HH:mm:ss',
  };
  launched = false;

  form: FormGroup;

  plans = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private storeService: StoreService,
    private notificationService: NotificationService
  ) {
    this.setCountdown();

    this.form = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ]
    });
  }

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
    // if ( !this.launched ) {
    const CountdownTimeUnits: Array<[string, number]> = [
      ['Y', 1000 * 60 * 60 * 24 * 365], // years
      ['M', 1000 * 60 * 60 * 24 * 30], // months
      ['D', 1000 * 60 * 60 * 24], // days
      ['H', 1000 * 60 * 60], // hours
      ['m', 1000 * 60], // minutes
      ['s', 1000], // seconds
      ['S', 1] // million seconds
    ];

    // tslint:disable-next-line: one-variable-per-declaration
    const formatDate: CountdownFormatFn = ({ date, formatStr, timezone }) => {
      let duration = Number(date || 0);

      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
            return v.toString().padStart(match.length, '0');
          });
        }
        return current;
      }, formatStr);
    };


    // this.countdownConfig = {
    //   leftTime: end.diff(start, 'seconds'),
    //   format: 'HH:mm:ss',
    //   formatDate
    // };
    // }
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
