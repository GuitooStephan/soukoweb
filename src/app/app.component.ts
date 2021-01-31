import { Component, OnInit } from '@angular/core';
import { TimelineMax, Back } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menu = new TimelineMax( { ease: Back.easeOut.config(2), paused: true } );

  ngOnInit(): void {
    this.createMenuAnim();
  }

  createMenuAnim(){
    this.menu.to( '.menu-container', .2, { opacity: 0, y: '-30px', stagger: 0.1 } );
    this.menu.to( '.menu-wrapper', .2, { clipPath: 'circle(0%)' }, '-=.2' );
  }

  toggleMenu() {
    this.menu.restart();
  }
}
