import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(data: object) {
    return this.http.post(this.baseUrl + 'customer', data);
  }

  verifyOtp(data: object) {
    return this.http.post(this.baseUrl + 'customer/verify', data);
  }

  login(data: object) {
    return this.http.post(this.baseUrl + 'user/authenticate', data);
  }

  initiateResetOTP(data: object) {
    return this.http.post(this.baseUrl + 'user/reset-password/initiate', data);
  }

  completeResetOTP(data: object) {
    return this.http.post(this.baseUrl + 'user/reset-password/complete', data);
  }

  resendOTP(data: object) {
    return this.http.post(this.baseUrl + 'user/resend-otp', data);
  }

  changePassword(data: object) {
    return this.http.post(this.baseUrl + 'user/change-password', data);
  }
}
