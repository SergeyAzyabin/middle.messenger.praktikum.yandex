import tpl from './index.hbs';

import Block from '../../../core/block';

import img from '../../../../static/img/*'; // eslint-disable-line

import { Input, FormGroup, Button } from '../../../components';

import { Validation, validationHandler } from '../../../utils/Validation';

export default class ProfilePassword extends Block {

	constructor() {
		super('div', {
			img: img,

			inputOldPassword: new FormGroup({
				title: 'Старый пароль',
				class: 'profile-field',
				input: new Input({
					name: 'oldPassword',
					type: 'password',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputOldPassword);
						},
					},
				}),
			}),
			inputNewPassword: new FormGroup({
				title: 'Новый пароль',
				class: 'profile-field',
				input: new Input({
					name: 'newPassword',
					type: 'password',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputNewPassword);
						},
					},
				}),
			}),
			inputConfirm: new FormGroup({
				title: 'Повторите пароль',
				class: 'profile-field',
				input: new Input({
					name: 'confirm',
					type: 'password',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputConfirm);
						},
					},
				}),
			}),
			buttonSave: new Button({
				name: 'Сохранить',
				type: 'submit',

			}),
		});

		const form = this.element.querySelector('form') as HTMLFormElement;
		form.addEventListener('submit', e => {
			e.preventDefault();
			const formData = new FormData(form);
			const inputs = [
				this.children.inputOldPassword.children.input,
				this.children.inputNewPassword.children.input,
				this.children.inputConfirm.children.input,
			];
			let validForm = true;
			inputs.map((input) => {
				const el = input.element as HTMLInputElement;
				if (!Validation(el)) {
					validForm = false;
				}
			});
			if (validForm) {
				for (let [key, value] of formData.entries()) {
					console.log(key, value);
				}
			}
		});
	}


	render(): DocumentFragment {
		return this.compile(tpl,
			this.props,
		);
	}
}