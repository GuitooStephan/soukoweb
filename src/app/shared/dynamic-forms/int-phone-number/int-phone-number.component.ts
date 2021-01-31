import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-int-phone-number',
  templateUrl: './int-phone-number.component.html',
  styleUrls: ['./int-phone-number.component.css']
})
export class IntPhoneNumberComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'col-lg-12';

  field: FieldConfig;
  group: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.class = this.field.wrapper_classes || 'col-lg-12';
    setTimeout( () => this.cdr.markForCheck(), 100 );
  }

  hasError(e) {
    this.group.get( `${this.field.name}` ).setErrors( { notValid: !e } );
  }

  getNumber(e) {
    this.group.get(this.field.name).setValue(e);
  }

}
