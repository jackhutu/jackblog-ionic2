import {Page, Storage, LocalStorage} from 'ionic-angular';

export class AuthModel {
  token: string
  user: Object
  constructor(token?: string, user?: Object) {
    this.token = token || window.localStorage.getItem('token') || ''
    this.user = user || null
  }
}