import tpl from './chat.hbs';

import Block from '../../core/block';

import img from '../../../static/img/*'; // eslint-disable-line

import { Input, ChatSend, ChatItem } from '../../components';
const chatItems: ChatItem[] = [];

chatItems.push(new ChatItem({
	name: 'Андрей1',
	message: 'Привет',
	count: 2,
	time: '10:49',
	img: img['profile.svg'],
}));
chatItems.push(new ChatItem({
	name: 'Сергей',
	message: 'Ку ку',
	count: 3,
	time: '10:49',
	img: img['profile.svg'],
}));
chatItems.push(new ChatItem({
	name: 'Андрей1',
	message: 'Привет',
	count: 2,
	time: '10:49',
	img: img['profile.svg'],
}));

export default class Chat extends Block {

	constructor() {
		super('div', {
			img: img,
			chatSend: new ChatSend({
				img: img['chat-send.svg'],
				events: {
					click: (e: Event) => {
						e.preventDefault();
						console.log((this.children.chatInput.element as HTMLInputElement).value);
					},
				},
			}),
			chatInput: new Input({
				name: 'message',
				type: 'text',
				class: 'chat-input-field',
				events: {

				},
			}),
			chatItems,
		});
		console.log(this);
	}

	render(): DocumentFragment {
		return this.compile(tpl, this.props);
	}
}