import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public router: Router){
    this.router.events.subscribe( event => {
      if ( event instanceof NavigationEnd ){
        gtag('config', 'G-FN77QKZKZ1',
          {
            page_path: event.urlAfterRedirects
          }
        );
      }
    } );
  }

  ngOnInit(): void { }
}
