// import Handlebars from 'handlebars';
// import * as components from './components';

import 'normalize.css';
import * as pages from './pages';
import * as styles from './index.scss';


import img from '../static/img/*'

console.log(img);

const path = window.location.pathname;
if(path == '/') {
    root.innerHTML = pages.authPage();
} else if(path == '/register/') {
    root.innerHTML = pages.registerPage();
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