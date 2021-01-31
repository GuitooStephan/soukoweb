import { Component, OnInit, HostBinding, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterViewInit {

  // Default host css classes
  @HostBinding('class') class = 'col-lg-12 mb-4';

  field: FieldConfig;
  group: FormGroup;
  isPasswordField = false;
  show = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.checkIfPasswordField();
  }

  ngAfterViewInit(): void {
    // Edit host css class or keep default
    // Use wrapper_classes in fields definitions
    // Use bootstrap classes to specify width since the form has .row
    this.class = this.field.wrapper_classes || 'col-lg-12';
    setTimeout( () => this.cdr.markForCheck(), 100 );
  }

  checkIfPasswordField() {
    if (this.field.name.toLowerCase().includes('password')) {
      this.isPasswordField = true;
    } else {
      this.isPasswordField = false;
    }
  }

  /**
   * Handles toggling of password field input type
   */
  private togglePassword() {
    this.show = !this.show;
    if (this.show) {
      this.field.inputType = 'text';
    } else {
      this.field.inputType = 'password';
    }
  }

}
