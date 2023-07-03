import tpl from './auth.hbs';

import Block from '../../core/block';

import { validationHandler, Validation } from '../../utils/Validation';

import { FormGroup, ButtonLink, Input, Button } from '../../components';

export default class Auth extends Block {

	constructor() {
		super('div', {
			inputLogin: new FormGroup({
				title: 'Логин',
				class: 'form-group',
				input: new Input({
					name: 'login',
					type: 'text',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputLogin);
						},
					},
				}),
			}),
			inputPassword: new FormGroup({
				title: 'Пароль',
				class: 'form-group',
				input: new Input({
					name: 'password',
					type: 'password',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputPassword);
						},
					},
				}),
			}),
			buttonLogin: new Button({
				name: 'Войти',
				type: 'submit',
			}),
			buttonRegister: new ButtonLink({
				name: 'Нет аккаунта',
				link: '/register/',
			}),
		});


		const form = this.element.querySelector('form') as HTMLFormElement;
		form.addEventListener('submit', e => {
			e.preventDefault();
			
			const formData = new FormData(form);
			const inputs = [
				this.children.inputLogin.children.input, this.children.inputPassword.children.input,
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
			console.log(validForm);
		});
	}


	render(): DocumentFragment {
		return this.compile(tpl,
			this.props,
		);
	}
}