import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-int-phone-number',
  templateUrl: './int-phone-number.component.html',
  styleUrls: ['./int-phone-number.component.css']
})
export class IntPhoneNumberComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'col-lg-12';

  field: FieldConfig;
  group: FormGroup;

  SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  constructor( ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.class = this.field.wrapper_classes || 'col-lg-12';
  }

}
