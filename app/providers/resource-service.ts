import {Injectable, Inject} from 'angular2/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from 'angular2/http'
import {Page, Storage, LocalStorage} from 'ionic-angular'
import {Subject, BehaviorSubject, Observable} from 'rxjs'
import * as querystring from 'querystring'
import { API_ROOT } from '../config'


@Injectable()
export class ResourceService {
  headers:Headers = new Headers()

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json')
    this.headers.append('jackblog', 'ionic2')
  }
  interceptor():RequestOptions{
    const opts:RequestOptions = new RequestOptions()
    opts.headers = this.headers
    const token = window.localStorage.getItem('token')
    if (token && !opts.headers.get('Authorization')) {
      opts.headers.append('Authorization',
        'Bearer ' + token.replace(/(^\")|(\"$)/g, ''))
    }
    return opts
  }
  //登录请求.
  localLogin(data: Object): Observable<any> {
    return this.http.post(API_ROOT + 'auth/local', JSON.stringify(data), this.interceptor())
  }
  getSnsLogins(): Observable<any> {
    return this.http.get(API_ROOT + 'users/snsLogins', this.interceptor())
  }
  getMe(): Observable<any> {
    return this.http.get(API_ROOT + 'users/me', this.interceptor())
  }
  mdUser(data: Object): Observable<any> {
    return this.http.put(API_ROOT + 'users/mdUser', JSON.stringify(data), this.interceptor())
  }

  getTagList(): Observable<any> {
    return this.http.get(API_ROOT + 'tags/getFrontTagList', this.interceptor())
  }
  getApps(): Observable<any> {
    return this.http.get(API_ROOT + 'mobile/getApps', this.interceptor())
  }
  //article
  getIndexImage(): Observable<any> {
    return this.http.get(API_ROOT + 'article/getIndexImage', this.interceptor())
  }
  getFrontArticleList(options:Object): Observable<any> {
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify(options))
    return this.http.get(API_ROOT + 'article/getFrontArticleList', params)
  }
  getFrontArticleCount(): Observable<any> {
    return this.http.get(API_ROOT + 'article/getFrontArticleCount', this.interceptor())
  }
  getFrontArticle(id: string): Observable<any> {
    return this.http.get(API_ROOT + 'article/' + id + '/getFrontArticle', this.interceptor())
  }
  toggleLike(id: string): Observable<any> {
    return this.http.put(API_ROOT + 'article/' + id + '/toggleLike', '', this.interceptor())
  }
  getPrenext(id:string, options:Object): Observable<any> {
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify(options))
    return this.http.get(API_ROOT + 'article/' + id + '/getPrenext', params)
  }
  //comment
  getFrontCommentList(id:string): Observable<any> {
    return this.http.get(API_ROOT + 'comment/' + id + '/getFrontCommentList', this.interceptor())
  }
  addNewComment(data: Object): Observable<any> {
    return this.http.post(API_ROOT + 'comment/addNewComment', JSON.stringify(data), this.interceptor())
  }
  addNewReply(id:string,data:Object):Observable<any> {
    return this.http.post(API_ROOT + 'comment/'+ id +'/addNewReply',
      JSON.stringify(data), this.interceptor())
  }
}

