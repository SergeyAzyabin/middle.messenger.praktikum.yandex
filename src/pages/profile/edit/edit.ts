import tpl from './index.hbs';

import Block from '../../../utils/block';

import img from '../../../../static/img/*'; // eslint-disable-line

import { validationHandler, Validation } from '../../../utils/Validation';

import { Button, Input, FormGroup } from '../../../components';

export default class ProfileEdit extends Block {

	constructor() {
		super('div', {
			img: img,
			inputEmail: new FormGroup({
				title: 'Почта',
				class: 'profile-field',
				input: new Input({
					name: 'email',
					type: 'email',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputEmail);
						},
					},
				}),
			}),
			inputLogin: new FormGroup({
				title: 'Логин',
				class: 'profile-field',
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
			inputFirstName: new FormGroup({
				title: 'Имя',
				class: 'profile-field',
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
				class: 'profile-field',
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
			inputDisplayName: new FormGroup({
				title: 'Имя в чате',
				class: 'profile-field',
				input: new Input({
					name: 'display_name',
					type: 'text',
					events: {
						blur: (e: Event) => {
							validationHandler(e, this.children.inputDisplayName);
						},
					},
				}),
			}),
			inputPhone: new FormGroup({
				title: 'Телефон',
				class: 'profile-field',
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
				this.children.inputEmail.children.input,
				this.children.inputLogin.children.input,
				this.children.inputFirstName.children.input,
				this.children.inputSecondName.children.input,
				this.children.inputDisplayName.children.input,
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