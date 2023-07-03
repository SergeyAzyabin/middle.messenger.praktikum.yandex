import Block from '../../core/block';
import tpl from './button.hbs';

type Props = {
  name: string,
  type?: string,
  events?: {
    click: (e: Event) => void
  }
};

export default class Button extends Block {

	constructor(props: Props) {
		super('div', props);
	}

	render() {
		return this.compile(tpl, this.props);
	}
}