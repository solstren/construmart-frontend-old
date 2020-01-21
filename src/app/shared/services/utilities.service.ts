import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  modalToggle(status: boolean, id) {
    if (status === true) {
      $(id).modal('show');
    } else {
      $(id).modal('hide');
    }
  }

  showLoading(): void{
    $('#loading-overlay').show();
  }

  hideLoading(): void{
    $('#loading-overlay').fadeOut(500);
  }

  formatKey(tabName: string) {
    const key = tabName.split(' ');

    let newKey = '';
    if (key.length > 1) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < key.length; i++) {
        if (key.length == (i + 1)) {
          newKey += key[i];
        } else {
          newKey += key[i] + '-';
        }
      }
    } else {
      newKey = tabName;
    }

    return newKey;
  }
}
