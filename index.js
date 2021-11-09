// task-1 Создайте функцию unique(arr), которая вернёт массив уникальных,
//не повторяющихся значений массива arr

function unique(arr) {
    return Array.from(new Set(arr));
}

let values = [
    'Hare',
    'Krishna',
    'Hare',
    'Krishna',
    'Krishna',
    'Krishna',
    'Hare',
    'Hare',
    ':-O',
];

alert(unique(values));

// task-2 Каррирование функций

function volume(l, w, h) {
    return l * w * h;
}

const aCylinder = volume(100, 20, 90); // 180000

alert('first function ' + aCylinder);

function volumeCurrying(l) {
    return (w) => {
        return (h) => {
            return l * w * h;
        };
    };
}

const bCylinder = volumeCurrying(100)(20)(90);

alert('second function ' + bCylinder);

// task-3 Оператора нулевого слияния

const nullValue = null;
const emptyText = '';
const someNumber = 0;
const valA = nullValue ?? 'default for A';
const valB = emptyText ?? 'default for B';
const valC = someNumber || 1;
const valD = someNumber ?? null;

console.log(valA); //default for A
console.log(valB); // ""
console.log(valC); // 1
console.log(valD); // 0
