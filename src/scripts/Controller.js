import Collection from "./Collection";
import StudentsListView from "./view/StudentsListView";
import NewStudentFormView from "./view/NewStudentFormView";

class Controller {
    constructor($container) {
        this.$container = $container;

        this.studentsCollection = new Collection();
        this.studentsCollection.fetch().then(() => this.renderList());

        this.listView = new StudentsListView({
            onUpdate: (id, data) => this.updateMarks(id, data),
            onDelete: (id) => this.deleteStudent(id),
        });

        this.newStudent = new NewStudentFormView({
            onSave: (el) => this.saveStudent(el),
        });

        this.listView.appendTo($container);
        this.newStudent.appendTo($container);
    }

    renderList() {
        this.listView.renderList(this.studentsCollection.getList());
    }

    updateMarks(id, data) {
        this.studentsCollection
            .update(id, data)
            .then((item) => this.listView.renderUpdatedElement(item));
    }

    deleteStudent(id) {
        this.studentsCollection
            .delete(id)
            .then(() => this.listView.removeElement(id));
    }

    saveStudent(el) {
        this.studentsCollection
            .save(el)
            .then((item) => this.listView.renderElement(item));
    }
}

export default Controller;
