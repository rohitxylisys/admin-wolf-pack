import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { constants, LOCAL_STORAGE_KEYS } from 'src/app/global/constants';
import { RegexEnum } from 'src/app/global/regex-enum';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.email),
        ]),
      ],
      password: ['', [Validators.required]],
    });
  }
  async onSubmit() {
    if (this.loginForm.valid) {
      this.ngxLoader.start();
      const data = await this.loginForm.getRawValue();
      const response: any = await this.authService.login(data);
      if (response) {
        await this.localStorage.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.TOKEN,
          response.data.userToken ?? ''
        );
        this.router.navigate(['/home/dashboard']);
      }
      this.spinner.hide();
    }
  }
}
