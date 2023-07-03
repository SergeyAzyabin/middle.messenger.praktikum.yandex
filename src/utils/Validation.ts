import Block from '../core/block';

const validationRules: Record<string, RegExp> = {
	login: /^[0-9a-zA-Z\-_]{3,}/,
	password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
	oldPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
	newPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
	confirm: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
	phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
	email: /^[^\s@]+@[^\s@]+\.[\S]{2,}$/,
	first_name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
	second_name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
	message: /.+/,
	display_name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
};
/* eslint-disable */
export const errorMessages: Record<string, string> = {
	login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
	password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
	oldPassword: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
	newPassword: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
	confirm: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
	phone: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
	email: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
	first_name: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
	second_name: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
	message: 'Не должно быть пустым',
	display_name: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',

};
/* eslint-enable */
export function Validation(element: HTMLInputElement): boolean {
	const name = element.getAttribute('name');
	if (!name || !(name in validationRules)) {
		return true;
	}
	const rule = validationRules[name];
	if (element.value && element.value.search(rule) !== -1) {
		return true;
	}
	return false;
}

export const validationHandler = (e: Event, formGroup: Block) => {
	const element = e.target as HTMLInputElement;
	const name = element.getAttribute('name');
	if (!Validation(element) && name) {
		formGroup.setProps({
			error: errorMessages[name],
		});
		element.classList.add('error');
	} else {
		element.classList.remove('error');
		formGroup.setProps({
			error: '',
		});
	}
};