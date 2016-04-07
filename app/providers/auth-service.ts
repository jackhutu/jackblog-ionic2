import { Injectable, bind } from 'angular2/core'
import { Http, Response, Headers, RequestOptions } from 'angular2/http'
import {Subject, BehaviorSubject, ReplaySubject, Observable} from 'rxjs'
import {Page, Storage, LocalStorage, Events} from 'ionic-angular'
import { ResourceService } from './resource-service'
import { AuthModel } from '../models'
import { API_ROOT } from '../config'
import {Dialogs} from 'ionic-native'

@Injectable()
export class AuthService {
    authInitialState: AuthModel = new AuthModel()
    tokenSubject: Subject<string> = new BehaviorSubject<Object>(this.authInitialState.token)
    userSubject: Subject<Object> = new ReplaySubject<Object>(1)
    snsLoginsSubject: Subject<string[]> = new ReplaySubject<string[]>(1)
    storage:any

    constructor(
      public http: Http,
      public rs: ResourceService,
      public events: Events
    ) {
      this.storage = new Storage(LocalStorage)
      //token, 如果cookie存在, 则
      if (this.authInitialState.token !== ''){
        this.getUserInfo()
      }else{
        this.userSubject.next(this.authInitialState.user)
      }
      this.getSnsLogins()
    }

    saveToken(value: string): void {
      this.storage.set('token', value)
    }
    getToken() {
      return this.storage.get('token')
    }
    delToken():void {
      this.storage.remove('token')
    }
    //登录请求.
    localLogin(data: Object):void {
      this.rs.localLogin(data)
          .subscribe((res: Response) => {
            //成功
            let token = res.json().token
            this.saveToken(token)
            this.tokenSubject.next(token)
            this.getUserInfo()
            this.events.publish('user:login')
            window.plugins && window.plugins.toast.showShortCenter('登录成功, 欢迎光临!')
          },(err:any)=>{
            Dialogs.alert(err.json() && err.json().error_msg || '登录失败')
          })

    }
    getUserInfo():void{
      this.rs.getMe().subscribe((res:Response)=>{
        this.userSubject.next(res.json())
      })
    }
    logout():void{
      this.delToken()
      this.tokenSubject.next('')
      this.userSubject.next(this.authInitialState.user)
      this.events.publish('user:logout')
    }

    updateUser(data:Object):void{
      this.rs.mdUser(data).subscribe((res:Response)=>{
        this.userSubject.next(res.json().data)
        window.plugins && window.plugins.toast.showShortCenter('更新用户成功!')
      },(err:any)=>{
        Dialogs.alert(err.json() && err.json().error_msg || '更新用户资料失败')
      })
    }
    getSnsLogins(){
      this.rs.getSnsLogins()
        .subscribe((res:Response)=>{
          this.snsLoginsSubject.next(res.json().data)
        },(err)=>{
          this.snsLoginsSubject.next([])
        })
    }

}