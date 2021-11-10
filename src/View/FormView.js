import $ from 'jquery';
import { ViewOptions } from './ViewOptions';

export class FormView {
    constructor(options) {
        this.options = options;
        this.$el = this.initForm();
        this.viewOptions = new ViewOptions();
    }
    initForm() {
        return $(`<form id="message_form">
        <input type="text" class="input" id="message_name" name="name"/>
        <input type="text" class="input" id="directly_message" name="message"/>
        <button id="addMessageBtn" class="u-full-width">Send</button>
        </form>`).on('submit', this.onFormSubmit.bind(this));
    }
    appendTo($conteiner) {
        this.viewOptions.appendTo($conteiner, this.$el);
    }
    generateMessage(element) {
        return {
            name: element.name.value,
            message: element.message.value,
        };
    }

    onFormSubmit(e) {
        e.preventDefault();
        if (this.isFilled(e.target.elements)) {
            const message = this.generateMessage(e.target.elements);
            this.options.submit(message);
            e.target.reset();
        } else {
            throw Error('Fill in all fields!');
        }
    }
    isFilled(element) {
        return !!element.name.value && !!element.message.value;
    }
}
