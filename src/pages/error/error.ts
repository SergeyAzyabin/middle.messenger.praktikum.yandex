import tpl from './error.hbs';

import Block from '../../core/block';

import img from '../../../static/img/*'; // eslint-disable-line



export default class ErrorPage extends Block {

	constructor() {
		super('div', {
			img: img,
			error: 'Ошибка',
			description: 'Не туда попали',
		});
	}


	render(): DocumentFragment {
		return this.compile(tpl,
			this.props,
		);
	}
}