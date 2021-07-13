import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    public translate: TranslateService
  ){
    this.router.events.subscribe( event => {
      if ( event instanceof NavigationEnd ){
        gtag('config', 'G-FN77QKZKZ1',
          {
            page_path: event.urlAfterRedirects
          }
        );
      }
    } );

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
    translate.use(this.translate.getBrowserLang());
  }

  ngOnInit(): void { }

  changeLanguageToFrench() {
    this.translate.use('fr');
  }

  changeLanguageToEnglish() {
    this.translate.use('en');
  }
}
