class StudentsListView {
    static STUDENT_SELECTOR = '.student';
    static MARKS_SELECTOR = '.input-mark';
    static DELETE_BTN_SELECTOR = '.delete-btn';

    constructor(options) {
        this._$el = this.initView();
        this._$options = options;
    }

    initView() {
        return $(`<div class="title">
                </div>`)
            .on(
                'focusout',
                StudentsListView.MARKS_SELECTOR,
                this.onFocusOut.bind(this)
            )
            .on(
                'click',
                StudentsListView.DELETE_BTN_SELECTOR,
                this.onDeleteBtnClick.bind(this)
            );
    }

    onFocusOut(e) {
        e.preventDefault();

        const parentEl = this.getParentElement(e.target);
        const id = this.getElementId(parentEl);
        const data = this.getNewMarksData(parentEl);

        this._$options.onUpdate(id, data);
    }

    onDeleteBtnClick(e) {
        e.stopPropagation();

        const parentEl = this.getParentElement(e.target);
        const id = this.getElementId(parentEl);

        this._$options.onDelete(id);
    }

    getParentElement(el) {
        return el.closest(StudentsListView.STUDENT_SELECTOR);
    }

    getElementId(el) {
        return el && el.dataset.id;
    }

    getNewMarksData(el) {
        const $marks = $(el).find(StudentsListView.MARKS_SELECTOR);
        const marks = $($marks)
            .map(function () {

                return $(this).val();
            })
            .get();

        return marks;
    }

    removeElement(id) {
        this._$el.find(`[data-id="${id}"]`).remove();
    }

    appendTo($container) {
        $container.append(this._$el);
    }

    renderList(list) {
        const html = list.map((item) => this.generateItemHtml(item)).join('');
        this._$el.html(html);
    }

    renderElement(item) {
        const html = this.generateItemHtml(item);
        this._$el.append(html);
    }

    renderUpdatedElement(item) {
        const html = this.generateItemHtml(item);
        this._$el.find(`[data-id="${item.id}"]`).replaceWith(html);
    }

    generateItemHtml(item) {
        return `<div class="student" data-id="${item.id}">
                    <div class="student-name">${item.name}</div>
                    <span class="delete-btn">x</span>
                    ${item.marks.map(
                        (mark, index) => `<div class="student-mark">
                                    <input class="input-mark" id="${index}" value="${mark}"/>
                                </div>`
                    )}
                    </div>`;
    }
}
