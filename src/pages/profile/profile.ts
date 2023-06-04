import tpl from './profile.hbs';

import Block from '../../utils/Block';

import img from '../../../static/img/*';



export default class Profile extends Block {

    constructor() {
        super('div', {
            img : img,
        });
    }
    
    
    render(): DocumentFragment {
        return this.compile(tpl,
            this.props
        )
    }
}