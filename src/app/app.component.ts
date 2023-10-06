import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { constants } from './global/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Admin Panel';

  constructor(public translate: TranslateService) {
    translate.setDefaultLang(constants.ENGLISH_LANGUAGE_CODE);
  }
}
