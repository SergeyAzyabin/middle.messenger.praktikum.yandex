import tpl from './register.hbs';

import Block from '../../utils/Block';

import { validationHandler} from '../../utils/Validation';

import { FormGroup, ButtonLink , Input} from '../../components';

export default class Register extends Block {

    constructor() {
        super('div', {
            inputFirstName: new FormGroup({
                title: 'Имя',
                input : new Input({
                    name : 'first_name',
                    type : 'text',
                    events : {
                        blur : (e: Event) => {
                            validationHandler(e,this.children.inputFirstName);
                            
                        }
                    }
                })
            }),
            inputSecondName: new FormGroup({
                title: 'Фамилия',
                input : new Input({
                    name : 'second_name',
                    type : 'text',
                    events : {
                        blur : (e: Event) => {
                            validationHandler(e,this.children.inputSecondName);
                        }
                    }
                })
            }),
            inputLogin: new FormGroup({
                title: 'Логин',
                input : new Input({
                    name : 'login',
                    type : 'text',
                    events : {
                        blur : (e: Event) => {
                            validationHandler(e,this.children.inputLogin);
                        }
                    }
                })
            }),

            inputEmail: new FormGroup({
                title: 'Почта',
                input : new Input({
                    name : 'email',
                    type : 'text',
                    events : {
                        blur : (e: Event) => {
                            validationHandler(e,this.children.inputEmail);
                        }
                    }
                })
            }),

            inputPassword: new FormGroup({
                title: 'Пароль',
                input : new Input({
                    name : 'password',
                    type : 'text',
                    events : {
                        blur : (e: Event) => {
                            validationHandler(e,this.children.inputPassword);
                        }
                    }
                })
            }),
            inputPhone: new FormGroup({
                title: 'Телефон',
                input : new Input({
                    name : 'phone',
                    type : 'tel',
                    events : {
                        blur : (e: Event) => {
                            validationHandler(e,this.children.inputPhone);
                        }
                    }
                })
            }),

            buttonRegister: new ButtonLink({
                name: 'Зарегистрироваться',
                link: '/chat/'
            }),
            buttonAuth: new ButtonLink({
                name: 'Войти',
                link: '/auth/',
                events : {
                    click : (e: Event) => {
                        e.preventDefault();
                        console.log(e);
                    }
                }
            }),
            
        });
    }
    
    
    render(): DocumentFragment {
        return this.compile(tpl,
            this.props
        )
    }
}