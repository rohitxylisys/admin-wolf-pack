import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorHandler } from './shared/services/error-handler/http-error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  NgxUiLoaderService,
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { SharedModule } from './shared/components/shared.module';
import { ComponentsModule } from './modules/components/components.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#d30101',
  bgsPosition: POSITION.bottomCenter,
  bgsOpacity: 0.5,
  blur: 15,
  bgsSize: 50,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: 'three-strings', // foreground spinner type
  fgsSize: 80,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 4, // progress bar thickness,
  fgsColor: '#06d7e5',
  text: 'in progress...',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [HttpErrorHandler, TranslateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
