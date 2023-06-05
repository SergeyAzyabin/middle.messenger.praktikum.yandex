import Block from '../../utils/block';
import Input from '../input';
import tpl from './form-group.hbs';

type Props = {

  title: string,
  class?: string,
  input: Input,
  error?: string
};

export default class FormGroup extends Block {

	constructor(props: Props) {
		super('div', props);
	}

	render() {
		return this.compile(tpl, this.props);
	}
}