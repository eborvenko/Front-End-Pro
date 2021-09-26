//вывести сначала 10, потом 15 описав после функции вызов с контекстом

var x = 10;
var obj = { x: 15 };

function fun() {
    alert(this.x);
    alert(this);
}

fun();
fun.call(obj);

//использовать метод, принадлежащий одному объекту, а вызвать его в контексте другого:

var person = {
    firstName: 'John',
    lastName: 'Konor',
    fullName: function () {
        return this.firstName + ' ' + this.lastName;
    },
};
var user = {
    firstName: 'Max',
    lastName: 'White',
};

alert(person.fullName.call(user));

//через метод apply вызвать функцию и вернуть ["0", "1", "2", "length", "callee"]

var tester = function (x, y, z) {
    alert(Object.getOwnPropertyNames(arguments));
};

tester('x', 'y', 'z');
tester.apply(null, ['x', 'y', 'z']);
