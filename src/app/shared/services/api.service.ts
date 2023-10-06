import { constants } from 'src/app/global/constants';
import { LOCAL_STORAGE_KEYS } from './../../global/constants';
import { LocalStorageService } from './local-storage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorHandler } from './error-handler/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL = environment.apiEndPoint; // endpoint URL
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private httpErrorHandler: HttpErrorHandler,
    private ngxLoader: NgxUiLoaderService,
    private localStorageService: LocalStorageService
  ) {}

  async getHeaders(tokenRequired: boolean, formData?: boolean) {
    const token: any = await this.localStorageService.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.TOKEN
    );
    if (tokenRequired) {
      const headers = new HttpHeaders()
        .set('authorization', token)
        .set('Content-Type', 'application/json');
      return headers;
    } else if (formData) {
      const headers = new HttpHeaders().set('authorization', token);
      return headers;
    } else {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return headers;
    }
  }

  // this function should be used for fetch details without header token
  async get(path: any, authorize: boolean, loaderContinue?: any) {
    return new Promise(async (resolve: any, _) => {
      const success = (res: any) => {
        // toaster success message
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        if (!loaderContinue) {
          this.ngxLoader.stop();
        }
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(authorize, false);
        return this.http
          .get(`${this.URL}${path}`, { headers })
          .subscribe({ next: success, error: error });
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  // this function should be used for post details without header token
  async post(path: any, obj: any, authorize: boolean) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        this.ngxLoader.stop();
        resolve(res);
      };
      const error = (err: any) => {          
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(authorize, false);
        return this.http
          .post<any>(`${this.URL}${path}`, obj, { headers })
          .subscribe({ next: success, error: error });
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  // this function should be used for post details with header token

  async postFormDataReqWithToken(path: any, obj: any) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        this.ngxLoader.stop();
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(false, true);
        return this.http
          .post<any>(`${this.URL}${path}`, obj, {
            headers,
          })
          .subscribe({ next: success, error: error });
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  async uploadFileWithProgress(path: any, obj: any) {
    const netowrkIsConnected = await this.getNetworkConnection();
    if (netowrkIsConnected) {
      const headers = await this.getHeaders(false, true);
      return this.http.post<any>(`${this.URL}${path}`, obj, {
        headers,
        reportProgress: true,
        observe: 'events',
      });
    } else {
      this.ngxLoader.stop();
      this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
      return;
    }
  }

  async postExportData(path: any, obj: any) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        this.ngxLoader.stop();
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const options = {
        headers: await this.getHeaders(false, true),
        responseType: 'text' as 'json',
      };
      return this.http
        .post<any>(this.URL + path, obj, options)
        .subscribe({ next: success, error: error });
    });
  }

  async delete(path: any, authorize: boolean) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        // toaster success message
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        this.ngxLoader.stop();
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(authorize, false);
        return this.http
          .delete(`${this.URL}${path}`, { headers })
          .subscribe({ next: success, error: error });
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  async getFile(url: any) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        // toaster success message
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(url, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        return this.http
          .get(url, { responseType: 'blob' })
          .subscribe({ next: success, error: error });
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  getNetworkConnection() {
    const isOnline: boolean = navigator.onLine;
    if (isOnline) {
      return true;
    }
    return false;
  }
}
