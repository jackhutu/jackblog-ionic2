import {
  CORE_DIRECTIVES,
	FORM_DIRECTIVES,
	FormBuilder,
	ControlGroup,
	Control,
	Validators,
	AbstractControl } from 'angular2/common'

export function emailValidator(control: Control): { [s: string]: boolean } {
		if (!control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
				return { invalidEmail: true };
		}
}

export function nicknameValidator(control: Control): { [s: string]: boolean } {
		if (!control.value.match(/^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/)) {
				return { invalidNickname: true };
		}
}