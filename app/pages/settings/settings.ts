import {Page, NavController} from 'ionic-angular'
import {
  CORE_DIRECTIVES,
	FORM_DIRECTIVES,
	FormBuilder,
	ControlGroup,
	Control,
	Validators,
	AbstractControl } from 'angular2/common'
import {AuthService} from '../../providers/auth-service'
import {nicknameValidator} from '../../utils/validator'
import {HomePage} from '../home/home'

@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
	settingsForm: ControlGroup
	nickname: AbstractControl
	userNickname:string = ''

  constructor(
  	fb: FormBuilder,
  	public nav: NavController,
		private authService: AuthService) {
  	this.settingsForm = fb.group({
  		'nickname': ['', Validators.compose([
  				Validators.minLength(2),
  				Validators.maxLength(15),
  				Validators.required,
  				nicknameValidator
  			])]
  	})
  	this.nickname = this.settingsForm.controls['nickname']
  	this.authService.userSubject.subscribe((user:any)=>{
  		this.userNickname = user && user.nickname || ''
  	})
  }
  onPageLoaded(){
		if (!this.authService.getToken()) {
			this.nav.setRoot(HomePage)
  	}
  }

  onSubmit(user: Object): void {
  	//提交登录
  	this.authService.updateUser(user)
  }
}
