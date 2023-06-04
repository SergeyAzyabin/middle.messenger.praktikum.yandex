import 'normalize.css';
import './index.scss';
import './components';


import { RenderDOM } from './utils/RenderDOM';


import * as pages from  './pages';

import img from '../static/img/*';



const path = window.location.pathname;

if(path == '/') {
    RenderDOM('#root', new pages.authPage());
} else if(path == '/register/') {
    RenderDOM('#root', new pages.registerPage());
} else if(path == '/chat/') {
    RenderDOM('#root', new pages.chatPage());
} else if(path == '/profile/') {
    RenderDOM('#root', new pages.profilePage());
} else if(path == '/profile/edit/') {
    RenderDOM('#root', new pages.profileEditPage());
} else if(path == '/profile/password/') {
    RenderDOM('#root', new pages.profilePasswordPage());
}
else {
    RenderDOM('#root', new pages.errorPage());
}