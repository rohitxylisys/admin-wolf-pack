import { LOCAL_STORAGE_KEYS } from './../../../global/constants';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  async getUserAuthenticate() {
    const userFound = await this.localStorageService.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.TOKEN
    );
    return userFound;
  }

  async login(data: any) {
    return this.apiService.post('/admin/login', data, false);
  }

  async logout() {
    await this.localStorageService.removeDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.TOKEN
    );
    this.router.navigate(['/']);
  }

  // async forgotPassword(data: any) {
  //   return this.apiService.post('/staffs/forgot-password', data, false);
  // }
}
