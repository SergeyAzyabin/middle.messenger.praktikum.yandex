import Block from '../core/block';
import Router from '../core/router';
import { Store } from '../core/store';


export function RenderDOM(query: string, block: Block) {

	const root = document.querySelector(query);

	if (!root) {
		throw new Error('Root element not found');
	}

	root.innerHTML = '';

	root.appendChild(block.getContent());

	return root;
}

export function isEqual (lhs: string, rhs: string) {
    return lhs === rhs
}

