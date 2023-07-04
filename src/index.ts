import 'normalize.css';
import './index.scss';
import './components';

import Router from './core/router';
import { Store } from './core/store';
import { HTTPTransport } from './utils/HTTPTransport';

import img from '../static/img/*'; // eslint-disable-line
import { initRouter } from './router';


export type User = {
	id: number;
	login: string;
	firstName: string;
	secondName: string;
	displayName: string;
	avatar: string;
	phone: string;
	email: string;
};

export interface AppState {
	loginFormError: string | null;
	user: User | null;
}


export const defaultState: AppState = {
	loginFormError: null,
	user: null,
};

declare global {
	interface Window {
		store: Store<AppState>;
		router: Router;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const store = new Store(defaultState);


	store.on('changed', (prevState, nextState) => {
		console.log(prevState);
		
	});

	initRouter();

	store.dispatch(initApp);

})

// type LoginRequestData = {
// 	login: string;
// 	password: string;
// };

async function initApp(){
	try {
		// const response = await authTransport.getOwnInfo();

		// if (hasError(response)) {
		// 	return;
		// }

		// dispatch({ user: response as User });
	} catch (err) {
		// console.error(err);
	} finally {
		// dispatch({ appIsInited: true });
	}
};
