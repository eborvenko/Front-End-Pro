function createCalculator(a) {
    let num = a;

    return {
        add: (b) => {
            if (verification(b)) {
                console.log((num = num + b));
            }
        },
        sub: (b) => {
            if (verification(b)) {
                console.log((num = num - b));
            }
        },
        set: (b) => {
            if (verification(b)) {
                console.log((num = b));
            }
        },
        get: (b) => console.log(num),
    };
}

function verification(b) {
    if (isNaN(b)) {
        console.log("NaN");
        return false;
    }
    return true;
}

const calculator = createCalculator(100);

calculator.add(10); // 110
calculator.add(10); // 120
calculator.sub(20); // 100
calculator.set(20); // 20
calculator.add(10); // 30
calculator.add(10); // 40
calculator.add("qwe"); // NaN и значение 40 не менять
calculator.get(); // 40