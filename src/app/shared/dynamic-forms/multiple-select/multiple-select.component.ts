import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, HostBinding, IterableDiffers, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent implements OnInit, AfterViewInit, DoCheck {
  @HostBinding('class') class = 'col-lg-12';

  field: FieldConfig;
  group: FormGroup;
  items = [];
  iterableDiffer;

  constructor(
    private cdr: ChangeDetectorRef,
    private iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.class = this.field.wrapper_classes || 'col-lg-12';
    setTimeout( () => this.cdr.markForCheck(), 100 );
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.field.options);
    if (changes) {
      this.items = this.field.options;
    }
  }

}
