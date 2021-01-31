import { Component, OnInit, HostBinding, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit, AfterViewInit {

  @HostBinding('class') class = 'col-lg-12 mb-4';

  field: FieldConfig;
  group: FormGroup;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.class = this.field.wrapper_classes || 'col-lg-12';
    this.cdr.detectChanges();
  }

}
