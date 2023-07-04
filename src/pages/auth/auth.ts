import tpl from './auth.hbs';

import Block from '../../core/block';



import { validationHandler, Validation } from '../../utils/Validation';

import { FormGroup, ButtonLink, Input, Button } from '../../components';

import { router } from '../../router';

import { authService } from '../../services/auth';

export default class Auth extends Block {

	constructor() {
		super('div', {});
	}

	protected init() {
		
		this.children.inputLogin = new FormGroup({
			title: 'Логин',
			class: 'form-group',
			input: new Input({
				name: 'login',
				type: 'text',
				events: {
					// change: (e: Event) => {
					// 	const { value } = e.target;
						
					// 	this.setProps({ login : value });
						
					// },
					blur: (e: Event) => {
						validationHandler(e, this.children.inputLogin);
					},
				},
			}),
		}),
		this.children.inputPassword = new FormGroup({
			title: 'Пароль',
			class: 'form-group',
			input: new Input({
				name: 'password',
				type: 'password',
				
				events: {
					// change: (e: Event) => {
					// 	const { value } = e.target;
					// 	this.setProps({ password : value });
					// },
					blur: (e: Event) => {
						validationHandler(e, this.children.inputPassword);
					},
				},
			}),
		}),
		this.children.buttonLogin = new Button({
			name: 'Войти',
			type: 'submit',
		}),
		this.children.buttonRegister = new ButtonLink({
			name: 'Нет аккаунта',
			link: '/sign-up',
			events: {
				click : ( e: Event) => {
					e.preventDefault();
					router.go('/sign-up');
				}
			}
		})
	


		// const form = this.element.querySelector('form') as HTMLFormElement;
		// console.log(form);
		// form.addEventListener('submit', e => {
		// 	e.preventDefault();
		// 	const inputs = [
		// 		this.children.inputLogin.children.input,
		// 		this.children.inputPassword.children.input,
		// 	];
		// 	let validForm = true;
		// 	inputs.map((input) => {
		// 		const el = input.element as HTMLInputElement;
		// 		if (!Validation(el)) {
		// 			validForm = false;
		// 			return
		// 		}
		// 	});
		// 	if(validForm) {
		// 		// window.store.dispatch(authService.login, {
		// 		// 	login: this.props.login,
		// 		// 	password: this.props.password,
		// 		// });
		// 	}
		// 	console.log('fsdasdfsd');
		// });
	};
	render(): DocumentFragment {
		return this.compile(tpl,
			this.props,
		);
	}
}