import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from 'src/app/core/services/store.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { UpdateLogoFields } from './update-logo.fields';

@Component({
  selector: 'app-update-logo',
  templateUrl: './update-logo.component.html',
  styleUrls: ['./update-logo.component.css']
})
export class UpdateLogoComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) updateLogoForm: DynamicFormComponent;
  @Input() storeId;

  fields = UpdateLogoFields;

  loading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  updateLogo() {
    if ( !this.updateLogoForm.valid ) {
      this.updateLogoForm.validateAllFormFields();
      return;
    }

    this.loading = true;
    const value = this.updateLogoForm.value;

    const formData: FormData = new FormData();
    formData.append( 'logo_url', value.logo_url, value.logo_url.name );

    this.storeService.updateLogo( this.storeId, formData ).subscribe(
      data => {
        this.loading = false;
        this.activeModal.close( 'success' );
      }
    );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
