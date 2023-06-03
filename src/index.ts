import 'normalize.css';
import './index.scss';
import './components';


import { RenderDOM } from './utils/RenderDOM';

import Auth from './pages/auth';
import Register from './pages/register';

import * as pages from './pages';

import img from '../static/img/*';



// const root: HTMLElement | null = document.querySelector('#root');

const path = window.location.pathname;


const auth = new Auth({});
const register = new Register({});


if(path == '/') {
    
    RenderDOM('#root', auth);
    
} else if(path == '/register/') {

    RenderDOM('#root', register);

} else if(path == '/chat/') {
    root.innerHTML = pages.chatPage({ img });
} else if(path == '/profile/') {
    root.innerHTML = pages.profilePage({ img });
} else if(path == '/profile/edit/') {
    root.innerHTML = pages.profileEditPage({ img });
} else if(path == '/profile/password/') {
    root.innerHTML = pages.profilePasswordPage({ img });
} 
else {
    root.innerHTML = pages.errorPage({
        error : "404",
        description: "Не туда попали"
    });
}