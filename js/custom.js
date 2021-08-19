var alphabet = ['a', 'b', 'c'];

alphabet.push(1, 2, 3);

console.log('alphabet -->', alphabet);

////////////////////

var arrayReverse = [1, 2, 3];

// arrayReverse.reverse();

console.log('arrayReverse -->', arrayReverse.reverse());

/////////////////////////

var arrayAdded = [1, 2, 3];

arrayAdded.unshift(4, 5, 6);

console.log('arrayAdded -->', arrayAdded);

///////////////////////

var arraySlice = [1, 2, 3, 4, 5];
var arrayNewSlice = arraySlice.slice(0, 3);

console.log('arrayNewSlice -->', arrayNewSlice);

/////////////////////////

var wordsArray = ['js', 'css', 'jq'];

document.write(`fisrt elements -- ${wordsArray[0]} </br>`);
document.write(`method .shift -- ${wordsArray.shift()}`);


///////////////////////////

var fromPairs = (array) => {   
    var objectArray = {};

    array.forEach(function(item) {
        objectArray[item[0]] = item[1];
    });

    return objectArray;

};

const data = [['a', 1], ['b', 2]];

console.log('New object array the first version -->', fromPairs(data)); // { 'a': 1, 'b': 2 }



var fromPairs = (array) => {   
   
    return array.reduce(function(newArray, dataArray) {
        newArray[dataArray[0]] = dataArray[1];
    
        return newArray;
    }, {});

};

console.log('New object array the second version -->', fromPairs(data)); // { 'a': 1, 'b': 2 }
