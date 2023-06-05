import tpl from './register.hbs';

import Block from '../../utils/block';

import { validationHandler, Validation } from '../../utils/Validation';

import { FormGroup, ButtonLink, Input, Button } from '../../components';

export default class Register extends Block {

	constructor() {
		super('div', {
			inputFirstName: new FormGroup({
				title: 'Имя',
				class: 'form-group',
				input: new Input({
					name: 'first_name',
					type: 'text',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputFirstName);

						},
					},
				}),
			}),
			inputSecondName: new FormGroup({
				title: 'Фамилия',
				class: 'form-group',
				input: new Input({
					name: 'second_name',
					type: 'text',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputSecondName);
						},
					},
				}),
			}),
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

			inputEmail: new FormGroup({
				title: 'Почта',
				class: 'form-group',
				input: new Input({
					name: 'email',
					type: 'text',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputEmail);
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
			inputPhone: new FormGroup({
				title: 'Телефон',
				class: 'form-group',
				input: new Input({
					name: 'phone',
					type: 'tel',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputPhone);
						},
					},
				}),
			}),

			buttonRegister: new Button({
				name: 'Зарегистрироваться',
				type: 'submit',

			}),
			buttonAuth: new ButtonLink({
				name: 'Войти',
				link: '/chat/',

			}),

		});

		const form = this.element.querySelector('form') as HTMLFormElement;
		form.addEventListener('submit', e => {
			e.preventDefault();
			const formData = new FormData(form);
			const inputs = [
				this.children.inputFirstName.children.input,
				this.children.inputSecondName.children.input,
				this.children.inputLogin.children.input,
				this.children.inputEmail.children.input,
				this.children.inputPassword.children.input,
				this.children.inputPhone.children.input,
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