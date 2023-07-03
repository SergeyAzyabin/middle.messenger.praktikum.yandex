import Block from '../../core/block';

import tpl from './chatlist-item.hbs';

type Props = {

  name: string,
  message: string,
  count: number,
  time: string,
  img: string
};

export default class ChatlistItem extends Block {

	constructor(props: Props) {
		super('div', props);
	}

	render() {
		return this.compile(tpl, this.props);
	}
}