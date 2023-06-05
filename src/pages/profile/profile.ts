import tpl from './profile.hbs';

import Block from '../../utils/block';

import img from '../../../static/img/*'; // eslint-disable-line



export default class Profile extends Block {

	constructor() {
		super('div', {
			img: img,
		});
	}


	render(): DocumentFragment {
		return this.compile(tpl,
			this.props,
		);
	}
}