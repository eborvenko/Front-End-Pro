'use strict';

// Задача 'Группа студентов':

class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }
}

class Group {
    #students;

    constructor() {
        this.#students = [];
    }

    get students() {
        return this.#students;
    }

    addStudent(student) {
        if (this.#isStudent(student)) {
            this.#students.push(student);
        }
    }

    #isStudent(student) {
        return student instanceof Student;
    }

    getAverageMark() {
        const marks = this.students.flatMap((student) => student.marks);
        const sum = marks.reduce((sum, mark) => sum + mark);

        return sum / marks.length;
    }
}

const group = new Group();

group.addStudent(new Student('John', [10, 8]));
group.addStudent(new Student('Alex', [10, 9]));
group.addStudent(new Student('Bob', [6, 10]));

console.log(group.students.length === 3);
group.addStudent({});
console.log(group.students.length === 3);

console.log(group.getAverageMark() === (10 + 8 + 10 + 9 + 6 + 10) / 6); // 8.83


// Полифил max() для массива:

Array.prototype.max = function () {
    let maxElem = null;

    for (let i = 0, len = this.length; i < len; ++i) {
        if (maxElem === null || maxElem < this[i]) {
            maxElem = this[i];
        }
    }

    return maxElem;
};

[3, 9, 22, -7, 44, 18, 7, 9, 15].max();


// Полифил shuffle() для массива (дополнительно):

Array.prototype.shuffle = function () {
    let i = this.length,
        j,
        temp;

    if (i == 0) return this;

    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }

    return this;
};

[1, 2, 3, 4, 5, 6, 7, 8, 9].shuffle();
