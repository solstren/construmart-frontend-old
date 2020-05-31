import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {Router} from '@angular/router';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isRegister = false;
  otpAvailable = false;
  authObject: any = {};
  awaitingVerification = false;

  verifyOtpObject: any = {};
  otp: any;
  isForgotPassword: any = false;

  forgotPasswordObject: any = {};
  resendOtp: any = {};
  isForgotPasswordOtpAvailable: boolean = false;
  constructor(private auth: AuthService, private utils: UtilitiesService, private router: Router) { }

  ngOnInit() {

  }

  setIsRegister(value: boolean) {
    this.isRegister = value;
  }

  login() {
    this.authObject.role = 2;
    this.utils.showLoading();
    this.auth.login(this.authObject).subscribe((data: any) => {
      if (data.status == true) {
        toastr.success('Login Successful');
        localStorage.setItem('token', JSON.stringify(data.body.token));
        location.href = 'landing';
      } else {
        this.utils.hideLoading();
        toastr.error('Something went wrong');
      }
    }, error => {
      this.utils.hideLoading();
      toastr.error(error.error.body.message);
    });
  }

  register() {
    this.utils.showLoading();
    if (this.awaitingVerification == false) {
      this.auth.register(this.authObject).subscribe((data: any) => {
        if (data.status == true) {
          this.otpAvailable = true;
          this.utils.hideLoading();
          toastr.success(data.message);
          this.verifyOtpObject.email = this.authObject.email;
          this.awaitingVerification = true;
        } else {
          this.utils.hideLoading();
          toastr.error(data.message);
        }
        this.utils.hideLoading();
        this.otpAvailable = true;
      }, error => {
        this.utils.hideLoading();
        if (error.error.body.message[0]) {
          toastr.error(error.error.message);
        } else{
          toastr.error(error.error.body.message);
        }

      });
    } else {
      this.utils.showLoading();
      this.auth.verifyOtp(this.verifyOtpObject).subscribe((data2: any) => {
        this.awaitingVerification = false;
        this.utils.hideLoading();
        toastr.success('Registration Successful, Please Login');
        location.reload();
      }, error => {
        this.utils.hideLoading();
        if (error.error.body.message[0]) {
          toastr.error(error.error.message);
        } else {
          toastr.error(error.error.body.message);
        }
      });
    }
  }

  forgotPassword() {
    this.isForgotPassword = true;
  }

  requestOtp() {
    this.authObject.role = 2;
    delete this.authObject.password;
    this.utils.showLoading();
    this.auth.initiateResetOTP(this.authObject).subscribe((data: any) => {
      if (data.status === true) {
        toastr.success(data.message);
        this.isForgotPasswordOtpAvailable = true;
      } else {
        toastr.error(data.message);
      }
    });
  }

  confirmOtp() {
    this.forgotPasswordObject.role = 2;
    this.forgotPasswordObject.email = this.authObject.email;

    this.auth.completeResetOTP(this.forgotPasswordObject).subscribe((data: any) => {
      if (data.status === true) {
        toastr.success(data.message);
        location.href = '/auth';
      } else {
        toastr.error(data.message);
      }
    });
  }

  resendToken() {
    this.resendOtp.role = 2;
    this.resendOtp.email = this.authObject.email;
    this.resendOtp.purpose = 0;
    this.auth.resendOTP(this.resendOtp).subscribe((data: any) => {
      if (data.status === true) {
        toastr.success('An OTP has been resent to your email.');
      } else {
        toastr.error(data.message);
      }
    });
  }
}
