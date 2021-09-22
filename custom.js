'use strict';

function Calculator(base) {

    this.base = base;

    return {
        add: (num) => {
            return isValidNumber(num) ? base += num : NaN;
        },
        sub: (num) => {
            return isValidNumber(num) ? base -= num : NaN;
        },
        set: (num) => {
            return isValidNumber(num) ? base = num : NaN;
        },
        get: () => {
            return base;
        }
    };
}

function isValidNumber(num) {
    return !isNaN(num);
}

const calculator = new Calculator(100);

calculator.add(10); // 110
calculator.add(10); // 120
calculator.sub(20); // 100
calculator.set(20); // 20
calculator.add(10); // 30
calculator.add(10); // 40
calculator.add("qwe"); // NaN и значение 40 не менять
calculator.get(); // 40

calculator.base;

