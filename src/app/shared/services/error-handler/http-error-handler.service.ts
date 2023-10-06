import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LocalStorageService } from '../local-storage.service';
import { NotificationAlertService } from '../notification.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandler {
  constructor(
    private notificationService: NotificationAlertService,
    private ngxLoader: NgxUiLoaderService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  async handleError(serviceName: any, error: HttpErrorResponse) {
    const errorMessage = error.error.error;
    if (errorMessage) {
      this.notificationService.showError(errorMessage);
    }
    this.ngxLoader.stop();
    switch (error.status) {
      case 400:
        throw error;
      case 401:
        localStorage.clear();
        this.localStorageService.clearDataFromIndexedDB();
        this.router.navigate(['/']);
        return;
      case 403:
        this.router.navigate(['/home/dashboard']);
        throw error;
      case 404:
        throw error;
      case 500:
        throw error;
      default:
    }

    throw error;
  }
}
