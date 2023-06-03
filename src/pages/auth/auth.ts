import tpl from './auth.hbs';

import Block from '../../utils/Block';

import { validationHandler} from '../../utils/Validation';

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
                        console.log(e);
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