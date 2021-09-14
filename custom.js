'use strict';

function Calculator(base) {
    this.base = base;
    return {
        add: (num) => {
            if (verification(num)) {
                console.log(base += num);
            }
        },
        sub: (num) => {
            if (verification(num)) {
                console.log(base -= num);
            }
        },
        set: (num) => {
            if (verification(num)) {
                console.log(base = num);
            }
        },
        get: () => {
            console.log(base);
        }
    };
}

function verification(num) {
    if (isNaN(num)) {
        console.log("NaN");
        return false;
    }
    return true;
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