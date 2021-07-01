import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-info',
  templateUrl: './dev-info.component.html',
  styleUrls: ['./dev-info.component.css']
})
export class DevInfoComponent implements OnInit {
  @Input() background = 'light';

  constructor() { }

  ngOnInit(): void {
  }

}
