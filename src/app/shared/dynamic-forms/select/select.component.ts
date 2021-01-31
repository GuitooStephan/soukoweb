import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'col-lg-12';

  field: FieldConfig;
  group: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.class = this.field.wrapper_classes;
    setTimeout( () => this.cdr.markForCheck(), 100 );
  }

}
