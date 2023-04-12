import Handlebars from 'handlebars';

import * as components from './components';
import * as pages from './pages';
import * as styles from './index.scss';

import img from '../static/img/*'

console.log(img);



Handlebars.registerPartial("button", components.button);
Handlebars.registerPartial("form-group", components.formGroup);



root.innerHTML = pages.authPage();
const path = window.location.pathname;
if(path == '/register/') {
    root.innerHTML = pages.registerPage();
}
if(path == '/chat/') {
    root.innerHTML = pages.chatPage({ img });
}
// if(window.location.pathname)
console.log(window.location.pathname);