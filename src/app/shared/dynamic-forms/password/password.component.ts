import { Component, OnInit, HostBinding, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FieldConfig } from '../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit, AfterViewInit {

// Default host css classes
@HostBinding('class') class = 'col-lg-12 mb-4';

field: FieldConfig;
group: FormGroup;
show = false;

constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.field.inputType = 'password';
  }

  ngAfterViewInit(): void {
    // Edit host css class or keep default
    // Use wrapper_classes in fields definitions
    // Use bootstrap classes to specify width since the form has .row
    this.class = this.field.wrapper_classes || 'col-lg-12';
    setTimeout( () => this.cdr.markForCheck(), 100 );
  }

  /**
   * Handles toggling of password field input type
   */
  togglePassword() {
    this.show = !this.show;
    if (this.show) {
      this.field.inputType = 'text';
    } else {
      this.field.inputType = 'password';
    }
  }

}
