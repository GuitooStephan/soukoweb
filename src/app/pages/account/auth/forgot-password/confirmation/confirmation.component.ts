import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  email;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private route: ActivatedRoute
  ) {
    this.setUpSEO();

    this.route.queryParams.subscribe(
      params => {
        this.email = params.email;
      }
    );
  }

  ngOnInit(): void {
  }

  setUpSEO() {
    this.titleService.setTitle('Forgot Password Confirmation | Souko');

    this.metaTagService.addTags([
      { name: 'description', content: 'Forgot Password Confirmation Page For Souko' },
      { name: 'keywords', content: 'Forgot Password Confirmation, Confirmation Page, Forgot Password Page, Souko' }
    ]);
  }

}
