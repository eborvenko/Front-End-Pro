'use strict';

function Hamburger(size) {
    this.size = size;
    this.toppings = [];
}

Hamburger.prototype.addTopping = function (topping) {
    !this.toppings.includes(topping)
        ? this.toppings.push(topping)
        : this.toppings;

    return this.toppings[this.toppings.length - 1];
};

Hamburger.prototype.getPrice = function () {
    const price =
        Hamburger.SIZES[this.size].price +
        this.toppings.reduce(
            (acc, item) => acc + Hamburger.TOPPINGS[item].price,
            0
        );

    return price;
};

Hamburger.prototype.getCallories = function () {
    const caloriesAmount =
        Hamburger.SIZES[this.size].calories +
        this.toppings.reduce(
            (acc, item) => acc + Hamburger.TOPPINGS[item].calories,
            0
        );

    return caloriesAmount;
};

Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_MED = 'SIZE_MED';
Hamburger.SIZE_LARGE = 'SIZE_LARGE';

Hamburger.SIZES = {
    [Hamburger.SIZE_SMALL]: {
        price: 50,
        calories: 20,
    },
    [Hamburger.SIZE_MED]: {
        price: 75,
        calories: 30,
    },
    [Hamburger.SIZE_LARGE]: {
        price: 100,
        calories: 40,
    },
};

Hamburger.TOPPING_CHEESE = 'TOPPING_CHEESE';
Hamburger.TOPPING_SALAD = 'TOPPING_SALAD';
Hamburger.TOPPING_POTATO = 'TOPPING_POTATO';
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';
Hamburger.TOPPING_SAUCE = 'TOPPING_SAUCE';

Hamburger.TOPPINGS = {
    [Hamburger.TOPPING_CHEESE]: {
        price: 10,
        calories: 20,
    },
    [Hamburger.TOPPING_SALAD]: {
        price: 20,
        calories: 5,
    },
    [Hamburger.TOPPING_POTATO]: {
        price: 15,
        calories: 10,
    },
    [Hamburger.TOPPING_SPICE]: {
        price: 15,
        calories: 0,
    },
    [Hamburger.TOPPING_SAUCE]: {
        price: 20,
        calories: 5,
    },
};

const hamburger = new Hamburger(Hamburger.SIZE_LARGE);

hamburger.addTopping(Hamburger.TOPPING_SAUCE);
hamburger.addTopping(Hamburger.TOPPING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_SALAD);

console.log('Price with sauce: ' + hamburger.getPrice());
console.log('Callories with sauce: ' + hamburger.getCallories());
