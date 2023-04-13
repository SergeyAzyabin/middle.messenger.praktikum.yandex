import Handlebars from 'handlebars';
import 'normalize.css';
import * as components from './components';
import * as pages from './pages';
import * as styles from './index.scss';


import img from '../static/img/*'

console.log(img);



Handlebars.registerPartial("button", components.button);
Handlebars.registerPartial("form-group", components.formGroup);
Handlebars.registerPartial("chat-item", components.chatItem);


root.innerHTML = pages.authPage();
const path = window.location.pathname;
if(path == '/register/') {
    root.innerHTML = pages.registerPage();
}
if(path == '/chat/') {
    root.innerHTML = pages.chatPage({ img });
}
if(path == '/profile/') {
    root.innerHTML = pages.profilePage({ img });
}