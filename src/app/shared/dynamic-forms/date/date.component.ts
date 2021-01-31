import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, AfterViewInit {
  // Default host css classes
  @HostBinding('class') class = 'col-lg-12 mb-4';

  field: FieldConfig;
  group: FormGroup;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Edit host css class or keep default
    // Use wrapper_classes in fields definitions
    // Use bootstrap classes to specify width since the form has .row
    this.class = this.field.wrapper_classes || 'col-lg-12';
    setTimeout( () => this.cdr.markForCheck(), 100 );
  }

}
