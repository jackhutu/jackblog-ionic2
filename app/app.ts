import 'es6-shim'
import {Type} from 'angular2/core'
import {App, Platform, Events, MenuController, IonicApp} from 'ionic-angular'
import {StatusBar} from 'ionic-native'
import {HomePage} from './pages/home/home'
import {SettingsPage} from './pages/settings/settings'
import {LoginPage} from './pages/login/login'
import {ResourceService} from './providers/resource-service'
import {ArticleService} from './providers/article-service'
import {AuthService} from './providers/auth-service'
import {TagService} from './providers/tag-service'
import {CustomTimePipe, FormatDatePipe} from './providers/pipes'
import {Toast} from 'ionic-native'

@App({
  templateUrl: 'build/app.html',
  pipes: [CustomTimePipe,FormatDatePipe],
  config: {},
  prodMode: false,
  providers: [ResourceService, TagService, AuthService, ArticleService]
})
export class MyApp {
  rootPage: Type = HomePage
  loginPage: Type = LoginPage
  settingsPage: Type = SettingsPage
  user: Object
  token: string
  defaultAvatar: string = 'img/avatar.png'

  constructor(
    public platform: Platform,
    public app: IonicApp,
    public events: Events,
    public menu: MenuController,
    public authService: AuthService) {
    platform.ready().then(() => {
      StatusBar.styleDefault()
    })
    this.authService.tokenSubject.subscribe((token:string)=>{
      this.token = token
    })
    this.authService.userSubject.subscribe((user:Object)=>{
      this.user = user
    })
    this.listenToLoginEvents()
  }
  
  onPageLoaded(){}

  openPage(page){
    this.menu.close()
    let nav = this.app.getComponent('nav')
    nav.setRoot(page)
  }

  logout(){
    this.authService.logout()
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.openPage(this.rootPage)
    });

    this.events.subscribe('user:logout', () => {
      this.openPage(this.rootPage)
    });
  }
}
