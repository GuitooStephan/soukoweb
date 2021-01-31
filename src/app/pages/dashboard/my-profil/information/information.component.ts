import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { InformationFields } from './information.fields';
import * as AuthActions from 'src/app/core/store/actions/auth.actions';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: false }) informationForm: DynamicFormComponent;
  fields = InformationFields;

  selectUser$;
  user;

  loading = false;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.selectUser$ = this.store.pipe( select( selectUser ) )
      .pipe( first() )
      .subscribe(
        data => {
          this.user = data;

          setTimeout( () => this.informationForm.setValue( this.user ), 100 );
        }
      );
  }

  ngOnDestroy(): void {
    this.selectUser$.unsubscribe();
  }

  updateInformation() {
    if ( !this.informationForm.valid ) {
      this.informationForm.validateAllFormFields();
      return;
    }

    this.store.dispatch( AuthActions.updateUser( { data: { userId: this.user.id, payload: this.informationForm.value }  } ) );
  }

}
