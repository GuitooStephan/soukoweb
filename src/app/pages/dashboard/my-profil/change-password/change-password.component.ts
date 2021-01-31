import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { ChangePasswordFields } from './change-password.fields';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) changePasswordForm: DynamicFormComponent;
  fields = ChangePasswordFields;

  loading = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  changePassword() {
    if ( !this.changePasswordForm.valid ){
      this.changePasswordForm.validateAllFormFields();
      return;
    }

    this.userService.changePassword( this.changePasswordForm.value ).subscribe(
      data => {
        this.notificationService.success( null, 'Password changed.' );
        this.changePasswordForm.reset();
      }
    );
  }

  matchPasswordValidator(group: FormGroup) {
    const pass = group.controls.new_password.value;
    const confirmPass = group.controls.confirm_new_password.value;
    if (pass !== confirmPass) {
      group.controls.confirm_new_password.setErrors({ incorrect: true });
      return { notSame: true };
    }
    return null;
  }

}
