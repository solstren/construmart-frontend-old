import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {UtilitiesService} from "../../shared/services/utilities.service";
import {Router} from "@angular/router";

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
  constructor(private auth: AuthService, private utils: UtilitiesService, private router: Router) { }

  ngOnInit() {
  }


  setIsRegister(value: boolean) {
    this.isRegister = value;
  }

  login() {
    this.authObject.role = 2;
    this.utils.showLoading();
    console.log(this.authObject);
    this.auth.login(this.authObject).subscribe((data: any) => {
      if (data.status == true) {
        console.log(data);
        toastr.success('Login Successful');
        localStorage.setItem('token', JSON.stringify(data.body.token));
        location.href = 'landing';
        // this.router.navigate(['/landing']);
      } else {
        this.utils.hideLoading();
        toastr.error('Something went wrong');
      }
      console.log(data);
    }, error => {
      this.utils.hideLoading();
      if (error.error.body.message[0]) {
        toastr.error(error.error.message);
      } else{
        toastr.error(error.error.body.message);
      }
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
        console.log(error);
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
        } else{
          toastr.error(error.error.body.message);
        }
      });
    }
  }
}
