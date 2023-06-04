import tpl from './index.hbs';

import Block from "../../../utils/block";

import img from '../../../../static/img/*';

import { ButtonLink, Input } from '../../../components';

export default class ProfilePassword extends Block {

    constructor() {
        super('div', {
            img : img,
            inputOldPassword : new Input({
                name : 'oldPassword',
                type : 'password',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            inputNewPassword : new Input({
                name : 'newPassword',
                type : 'password',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            inputConfirm : new Input({
                name : 'confirm',
                type : 'password',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            buttonSave: new ButtonLink({
                name: 'Сохранить',
                link: '/auth/',
                events : {
                    click : (e: Event) => {
                        e.preventDefault();
                        const form = this.element.querySelector('form') as HTMLFormElement;
                        const formData = new FormData(form);
                        for (let [key, value] of formData.entries()) {
                            console.log(key,value);
                        }
                    }
                }
            })
        });
    }
    
    
    render(): DocumentFragment {
        return this.compile(tpl,
            this.props
        )
    }
}