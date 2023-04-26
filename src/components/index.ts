import Handlebars from 'handlebars';
import buttonLink from './button-link';
import formGroup from './form-group';
import chatItem from './chatlist-item';

Handlebars.registerPartial("button-link", buttonLink);
Handlebars.registerPartial("form-group", formGroup);
Handlebars.registerPartial("chat-item", chatItem);


export { buttonLink, formGroup, chatItem };