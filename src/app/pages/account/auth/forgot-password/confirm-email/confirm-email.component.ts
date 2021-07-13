import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { ForgotPasswordFields } from './confirm-email.fields';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) forgotPasswordForm: DynamicFormComponent;

  fields = ForgotPasswordFields;
  error = '';
  loading = false;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private userService: UserService,
    private translateService: TranslateService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.setUpSEO();
  }

  ngOnInit(): void {
  }

  setUpSEO() {
    this.titleService.setTitle('Forgot Password | Souko');

    this.metaTagService.addTags([
      { name: 'description', content: 'Forgot Password Page For Souko' },
      { name: 'keywords', content: 'Forgot Password, Forgot Password Page, Souko' }
    ]);
  }

  forgotPassword() {
    if ( !this.forgotPasswordForm.valid ) {
      this.forgotPasswordForm.validateAllFormFields();
      return;
    }

    this.loading = true;
    this.userService.forgotPassword( this.forgotPasswordForm.value ).subscribe(
      data => {
        this.loading = false;
        this.router.navigate(
          ['account/auth/forgot-password/confirmation'],
          { queryParams: { email: this.forgotPasswordForm.value.email } }
        );
      },
      error => {
        this.translateService.get('notificationMessages.errorOccurred').subscribe( message => {
          this.loading = false;
          this.notificationService.error( null, message );
        } );
      }
    );
  }

}
