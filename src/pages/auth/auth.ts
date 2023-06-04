import tpl from './auth.hbs';

import Block from '../../utils/Block';

import { validationHandler, Validation} from '../../utils/Validation';

import { FormGroup, ButtonLink , Input} from '../../components';

export default class Auth extends Block {

    constructor() {
        super('div', {
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
            inputPassword: new FormGroup({
                title: 'Пароль',
                input : new Input({
                    name : 'password',
                    type : 'password',
                    events : {
                        blur : (e: Event) => {
                            validationHandler(e,this.children.inputPassword);
                        }
                    }
                })
            }),
            buttonLogin: new ButtonLink({
                name: 'Войти',
                link: '/chat/',
                events : {
                    click : (e: Event) => {
                        e.preventDefault();
                        const form = this.element.querySelector('form') as HTMLFormElement;
                        const formData = new FormData(form);
                        const inputs = [this.children.inputLogin.children.input, this.children.inputPassword.children.input];
                        let validForm = true;
                        inputs.map((input) => {
                            const el = input.element as HTMLInputElement;
                            if (!Validation(el)) {
                                validForm = false;
                            }
                        });
                        if (validForm) {
                            for (let [key, value] of formData.entries()) {
                                console.log(key,value);
                            }
                        }
                    }
                }
            }),
            buttonRegister: new ButtonLink({
                name: 'Нет аккаунта',
                link: '/register/'
            })
        });
    }
    
    
    render(): DocumentFragment {
        return this.compile(tpl,
            this.props
        )
    }
}