import { Component, OnInit, ViewChild, HostBinding, AfterViewInit } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';
import { FieldConfig } from '../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'col-lg-12 px-0';
  @ViewChild(DropzoneDirective, { static: true }) dropzone;

  field: FieldConfig;
  group: FormGroup;

  // tslint:disable-next-line: max-line-length
  config: DropzoneConfigInterface = {
    url: `${environment.base_url}`,
    autoProcessQueue: false,
    method: 'post',
    maxFiles: 1,
    acceptedFiles: 'image/*',
    // tslint:disable-next-line: max-line-length
    dictDefaultMessage: '<div><h5>Click Here or Drop file to upload</h5><div class="text-center mt-3"><i class="fa fa-2x fa-upload"></i></div></div>',
    dictMaxFilesExceeded: 'You can not upload any more files. Remove this file',
    parallelUploads: 2,
    previewTemplate: '\
    <div class="dropzone-preview col-4 text-center px-0">\
      <div><a class="is-a text-danger" data-dz-remove><i class="fa fa-minus-circle"></i></a></div>\
      <div class="dz-preview mb-3 dz-image-preview">\
        <div class="dz-image"><img data-dz-thumbnail class="img-fit"></div>\
        <div class="dz-success-mark">\
          <span>\
            <i class="text-success fa fa-3x fa-check-circle"></i>\
          </span>\
        </div>\
        <div class="dz-error-mark">\
          <span>\
            <i class="text-danger fa fa-3x fa-times-circle"></i>\
          </span>\
        </div>\
        <div class="dz-error-message"><span data-dz-errormessage></span></div>\
      </div>\
      <div class="dz-details">\
        <div class="dz-filename w-75 mx-auto text-center text-primary"><span data-dz-name></span></div>\
        <div class="dz-size text-center text-primary"><span data-dz-size></span></div>\
      </div>\
    </div>'
  };

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if ( this.field.wrapper_classes ) { this.class = this.field.wrapper_classes; }

    this.group.get( this.field.name ).valueChanges.subscribe(
      data => {
        if ( typeof data === 'string' ) {
          const dropzone = this.dropzone.dropzone();
          const mockFile = { name: data.split('/').pop(), size: 12345 };

          dropzone.emit( 'addedfile', mockFile );
          dropzone.emit( 'thumbnail', mockFile, data );
          dropzone.emit( 'complete', mockFile);
        }
      }
    );
  }

  _onAddedFile( file ) {
    if ( !this.group.get( this.field.name ).value ) {
      this.group.get(this.field.name).setValue(file);
    }
    this.group.get(this.field.name).markAsTouched();
  }

  _onRemovedFile( file ) {
    if ( typeof this.group.get( this.field.name ).value === 'string' ) {
      if ( file.name === this.group.get( this.field.name ).value.split('/').pop() ) {
        this.group.get(this.field.name).setValue( null );
      }
    } else {
      if ( file.name === this.group.get( this.field.name ).value.name ) {
        this.group.get(this.field.name).setValue( null );
      }
    }
  }

}
