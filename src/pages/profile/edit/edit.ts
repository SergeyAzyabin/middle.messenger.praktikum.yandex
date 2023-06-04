import tpl from './index.hbs';

import Block from "../../../utils/block";

import img from '../../../../static/img/*';

import { ButtonLink , Input } from '../../../components';

export default class ProfileEdit extends Block {

    constructor() {
        super('div', {
            img : img,
            inputEmail : new Input({
                name : 'email',
                type : 'email',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            inputLogin : new Input({
                name : 'login',
                type : 'text',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            inputFirstName : new Input({
                name : 'first_name',
                type : 'text',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            inputSecondName : new Input({
                name : 'second_name',
                type : 'text',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            inputDisplayName : new Input({
                name : 'display_name',
                type : 'text',
                events : {
                    blur : (e: Event) => {
                        
                    }
                }
            }),
            inputPhone : new Input({
                name : 'phone',
                type : 'tel',
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