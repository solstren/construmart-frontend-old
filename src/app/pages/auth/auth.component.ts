import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  toggleAuth(option: string) {
    if (option === 'login') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

}
