import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class NotificationAlertService {
  public myModal: any;
  public alertBoxFlag = false;
  public toasterIdList = [];
  configClass: any = { backdrop: 'static' };

  constructor(public toastService: ToastrService) {}

  clear() {
    this.toasterIdList.forEach((toastId) => {
      this.toastService.clear(toastId);
    });
    this.toasterIdList = [];
  }
  toasterErrorOpen(err: any) {
    const errMsg = err.error.error ? err.error.error : err.message;
    const data = {
      type: 'error',
      title: 'Error from Server',
      message: errMsg,
    };
  }

  showWarning(message: any) {
    const warningMessage = this.parseErrorMessage(message);
    this.toastService.warning(warningMessage, 'Warning');
  }
  showError(message: any) {
    const warningMessage = this.parseErrorMessage(message);
    this.toastService.error(warningMessage);
  }

  handleAPIError(error: any) {
    const errMsg = error.error.error
      ? error.error.error
      : error.error.message
      ? error.error.message
      : error.error.msg;
    const data = {
      type: 'error',
      title: 'Error from Server',
      message: errMsg,
    };
  }
  showSuccess(message: any) {
    const successMessage = this.parseErrorMessage(message);
    this.toastService.success(successMessage);
  }

  parseErrorMessage(message: any) {
    let errorMessage = '';
    try {
      errorMessage = JSON.parse(message).message;
    } catch (e) {
      if (typeof message === 'object') {
        errorMessage = message.message;
      } else {
        errorMessage = message;
      }
    }
    return errorMessage;
  }
}
