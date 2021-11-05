class NewStudentFormView {
    static ADD_BTN_SELECTOR = '.add-student-btn';
    static SAVE_BTN_SELECTOR = '.save-btn';
    static FORM_SELECTOR = '.student-form';
    static INPUT_SELECTOR = '.form-input';
    static HIDDEN_CLASS = 'hidden';

    constructor(options) {
        this._$el = this.init();
        this._options = options;
    }

    init() {
        return $(`<div class="add-student">
                        <div class="add-student-btn">Add new student</div>
                        <div class="student-form hidden">
                            <input type="text" class="form-input" placeholder="Enter Name">
                            <input type="text" class="form-input" placeholder="Enter Surname">
                            <button class="save-btn" type="button"> save </button>
                        </div>
                    </div>`).on(
            'click',
            NewStudentFormView.ADD_BTN_SELECTOR,
            this.onAddBtnClick.bind(this)
        );
    }

    initForm(item) {
        $(item).on(
            'click',
            NewStudentFormView.SAVE_BTN_SELECTOR,
            this.onCreateFormCLick.bind(this)
        );
    }

    onAddBtnClick(e) {
        e.preventDefault();

        const formHtml = this._$el
            .children(NewStudentFormView.FORM_SELECTOR)
            .show();

        this.initForm(formHtml);
        this._$el.children(NewStudentFormView.ADD_BTN_SELECTOR).hide();
    }

    onCreateFormCLick(e) {
        e.stopPropagation();

        const parentEl = e.target.closest(NewStudentFormView.FORM_SELECTOR);
        const studentName = this.getStudentName(parentEl);
        const newStudent = {
            name: studentName,
        };

        this._$el.children(NewStudentFormView.ADD_BTN_SELECTOR).show();
        this._$el.children(NewStudentFormView.FORM_SELECTOR).hide();
        this._options.onSave(newStudent);
        this.clearInputs(parentEl);
    }

    getStudentName(item) {
        return $(item)
            .find(NewStudentFormView.INPUT_SELECTOR)
            .map(function () {
                return $(this).val();
            })
            .get()
            .join(' ');
    }

    clearInputs(item) {
        return $(item)
            .find(NewStudentFormView.INPUT_SELECTOR)
            .map(function () {
                return $(this).val('');
            });
    }

    appendTo($container) {
        $container.after(this._$el);
    }
}
