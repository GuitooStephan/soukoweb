import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import * as AuthActions from 'src/app/core/store/actions/auth.actions';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  user;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private metaTagService: Meta
  ) {
    this.setUpSEO();

    this.store.pipe( select( selectUser ) ).subscribe(
      user => {
        if ( user ) {
          this.user = user;
        }
      }
    );
  }

  ngOnInit(): void {
  }

  setUpSEO() {
    this.titleService.setTitle('Confirmation | Souko');

    this.metaTagService.addTags([
      { name: 'description', content: 'Confirmation Page For Souko' },
      { name: 'keywords', content: 'Confirmation, Confirmation Page, Souko' }
    ]);
  }

  getStarted() {
    this.store.dispatch( AuthActions.signOut() );
  }

}
