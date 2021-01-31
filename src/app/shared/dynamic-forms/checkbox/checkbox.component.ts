import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit, AfterViewInit {

  // Default host css classes
  @HostBinding('class') class = 'col-lg-12 mb-4';

  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // Edit host css class or keep default
    // Use wrapper_classes in fields definitions
    // Use bootstrap classes to specify width since the form has .row
    this.class = this.field.wrapper_classes || 'col-lg-12';
  }

}
