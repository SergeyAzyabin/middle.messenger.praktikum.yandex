import 'normalize.css';
import './index.scss';
import './components';
import Router from './utils/router';

// import { RenderDOM } from './utils/helpers';

import * as pages from './pages';

import img from '../static/img/*'; // eslint-disable-line

const router = new Router('#app');


const links = document.querySelectorAll('a');

links.forEach(link => {
	const url = link.getAttribute('href');
	
	link.addEventListener('click', e => {
		e.preventDefault();
		
		router.go(url);
	})
});
window.addEventListener('load', () => {

		
	
		router
		.use('/',pages.authPage)
		.use('/sign-up', pages.registerPage)
		.use('/settings', pages.profilePage)
		.use('/settings/edit', pages.profileEditPage)
		.use('/settings/password', pages.profilePasswordPage)
		.use('/messenger', pages.chatPage)
		.start();
	}
)

// if (path == '/') {

// } else if (path == '/auth/') {
// 	RenderDOM('#root', new pages.authPage());
// } else if (path == '/register/') {
// 	RenderDOM('#root', new pages.registerPage());
// } else if (path == '/chat/') {
// 	RenderDOM('#root', new pages.chatPage());
// } else if (path == '/profile/') {
// 	RenderDOM('#root', new pages.profilePage());
// } else if (path == '/profile/edit/') {
// 	RenderDOM('#root', new pages.profileEditPage());
// } else if (path == '/profile/password/') {
// 	RenderDOM('#root', new pages.profilePasswordPage());
// } else if (path == '/500/') {
// 	RenderDOM('#root', new pages.errorPage());
// } else {
// 	RenderDOM('#root', new pages.errorPage());
// }