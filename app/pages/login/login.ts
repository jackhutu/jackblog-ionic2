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
import {emailValidator} from '../../utils/validator'
import {HomePage} from '../home/home'

@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
	signinForm: ControlGroup
	email: AbstractControl
	password: AbstractControl
  constructor(
  	fb: FormBuilder,
  	public authService: AuthService,
    public nav: NavController) {
  	this.signinForm = fb.group({
  		'email': ['', Validators.compose([
  			Validators.minLength(3),
  			Validators.maxLength(30),
  			Validators.required,
  			emailValidator
  			])],
  		'password': ['', Validators.required]
  	})
  	this.email = this.signinForm.controls['email']
  	this.password = this.signinForm.controls['password']
  }
  onSubmit(user: Object): void {
  	//提交登录
  	this.authService.localLogin(user)
  }
}