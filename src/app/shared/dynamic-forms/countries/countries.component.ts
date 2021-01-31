import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';

declare var $;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, AfterViewInit {
  // Default host css classes
  @HostBinding('class') class = 'col-lg-12 mb-4';
  @ViewChild('countrySelect') countrySelect;

  field: FieldConfig;
  group: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Edit host css class or keep default
    // Use wrapper_classes in fields definitions
    // Use bootstrap classes to specify width since the form has .row
    this.class = this.field.wrapper_classes || 'col-lg-12';
    setTimeout( () => this.cdr.markForCheck(), 100 );

    $( this.countrySelect.nativeElement ).countrySelect({
      defaultCountry: 'gh'
    });
    this.group.get(this.field.name).setValue( $(this.countrySelect.nativeElement).countrySelect("getSelectedCountryData").iso2.toUpperCase() );
  }

  selectCountry( event ) {
    this.group.get(this.field.name).setValue( $(this.countrySelect.nativeElement).countrySelect("getSelectedCountryData").iso2.toUpperCase() );
  }

}
