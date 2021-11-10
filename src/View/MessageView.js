import $ from 'jquery';
import { ViewOptions } from './ViewOptions';
import { MESSAGE_PLACE_SELECTOR } from '../options';

export class MessageView {
    constructor(options) {
        this._$el = this.initMessagPlace();
        this.viewOption = new ViewOptions();
    }
    initMessagPlace() {
        return `<div><ul id="message_place"></ul></div>`;
    }
    appendTo($conteiner, el) {
        $conteiner.append(el);
    }
    generateMessage(msg) {
        return `<li class="message"><span>${msg.name}</span>: <span>${msg.message}</span> </li>`;
    }
    addMessage(message) {
        this.appendTo($(MESSAGE_PLACE_SELECTOR), this.generateMessage(message));
    }
}
