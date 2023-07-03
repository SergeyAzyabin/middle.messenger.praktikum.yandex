import * as pages from './pages';
import Router from './core/router';


export const router = new Router();

export function initRouter() {
	
	router
		.use('/',pages.authPage)
		.use('/sign-up', pages.registerPage)
		.use('/settings', pages.profilePage)
		.use('/settings/edit', pages.profileEditPage)
		.use('/settings/password', pages.profilePasswordPage)
		.use('/messenger', pages.chatPage)
		.start();

	const links = document.querySelectorAll('a');
	links.forEach(link => {
		const url = link.getAttribute('href') as string;
		
		link.addEventListener('click', e => {
			e.preventDefault();
			
			router.go(url);
		})
	});
}