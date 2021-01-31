import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { ResetPasswordFields } from './reset-password.fields';

declare var _: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) resetPasswordForm: DynamicFormComponent;

  fields = ResetPasswordFields;
  token;
  loading = false;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.setUpSEO();

    this.route.queryParams.subscribe(
      params => {
        if ( params.token ) {
          this.token = params.token;
        } else {
          this.router.navigate( ['/account/auth/sign-in/'] );
        }
      }
    );
  }

  ngOnInit(): void {
  }

  setUpSEO() {
    this.titleService.setTitle('Reset Password | Souko');

    this.metaTagService.addTags([
      { name: 'description', content: 'Reset Password Page For Souko' },
      { name: 'keywords', content: 'Reset Password, Reset Password Page, Souko' }
    ]);
  }

  resetPassword() {
    if ( !this.resetPasswordForm.valid ) {
      this.resetPasswordForm.validateAllFormFields();
      return;
    }

    this.loading = true;
    const payload = { token: this.token, ..._.omit( this.resetPasswordForm.value, ['confirm_password'] ) };
    this.userService.resetPassword( payload ).subscribe(
      data => {
        this.loading = false;
        this.notificationService.success( null, 'Password reset was successfull' );
        this.router.navigate( ['/account/auth/sign-in'] );
      },
      error => {
        this.loading = false;
        this.notificationService.error( null, 'Error Occured.' );
      }
    );
  }

  matchPasswordValidator(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirm_password.value;
    if (pass !== confirmPass) {
      group.controls.confirm_password.setErrors({ incorrect: true });
      return { notSame: true };
    }
    return null;
  }

}
