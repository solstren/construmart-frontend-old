import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UtilitiesService} from '../../shared/services/utilities.service';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: any = {};

  constructor(private authService: AuthService, private utilService: UtilitiesService) { }

  ngOnInit() {
  }

  submitPassword() {
    this.authService.changePassword(this.changePassword).subscribe((data: any) => {
      if (data.status === true) {
          toastr.success(data.message);
          location.href = 'landing';
      } else {
        /*if (data.body.httpStatus === 401) {
          toastr.error(data.body.error);
        }*/
        toastr.error(data.message);
      }
    }, error => {
      toastr.error(error.error.body.message);
    });
  }
}
