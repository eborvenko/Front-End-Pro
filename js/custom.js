
let wizards = [
    {
      name: 'Harry Potter',
      house: 'Gryfindor'
    },
    {
      name: 'Cedric Diggory',
      house: 'Hufflepuff'
    },
    {
      name: 'Tonks',
      house: 'Hufflepuff'
    },
    {
      name: 'Ronald Weasley',
      house: 'Gryfindor'
    },
    {
      name: 'Hermione Granger',
      house: 'Gryfindor'
    }
];


let findName = wizards.reduce( function (newArr, wizard) {
    if (wizard.house === 'Hufflepuff') {
      newArr.push(wizard.name);
    }

    return newArr;
  }, []);

  console.log('Функция reduce', findName);

  //

let newArray = wizards.filter(function (wizard) {

  return wizard.house === 'Hufflepuff';
}).map( function (wizard) {

  return wizard.name;
});

console.log('Функция map', newArray);

// Tasks for arrays

let arr = ["Есть", "жизнь", "на", "Марсе"];

let arrLength = arr.map(function (item) {
    return item.length;
});

//alert( `Функция map ${arrLength}` );

//Метод concat

let arrayFirst = ['a', 'b', 'c'];
let arraySecond = [1, 2, 3];

console.log('Метод concat', arrayFirst.concat(arraySecond) );
console.log('Метод concat',  arraySecond.concat(arrayFirst) );


//Метод push

let arrPush = ['a', 'b', 'c'];

arrPush.push(1, 2, 3)

console.log('Метод push', arrPush);


//Работа с concat

let arrConcat = [4, 5, 6];

console.log('Метод concat', arrConcat.concat(arraySecond) );
console.log('Метод concat',  arraySecond.concat(arrConcat) );

//Работа с reverse

console.log('Метод reverse', arraySecond.reverse() );

//Работа с push

let arrayPush = [1, 2, 3];

arrayPush.push(4, 5, 6);

console.log('Метод push', arrayPush);

//Работа с unshift

let arrayUnshift = [1, 2, 3];

arrayUnshift.unshift(4, 5, 6);

console.log('Метод unshift', arrayUnshift);

//Работа с shift

let arrayShift = ['js', 'css', 'jq'];

document.write(`Метод shift - первый элемент ${arrayShift.shift()} </br>`);
console.log('Метод shift - первый элемент ', arrayShift.shift() );

//Работа с  pop

let arrayPop = ['js', 'css', 'jq'];

document.write(`Метод pop - последний элемент ${arrayPop.pop()} </br>`);
console.log('Метод pop - последний элемент ', arrayPop.pop() );

//Работа с slice

let arraySlice = [1, 2, 3, 4, 5];

arrNewSlice1 = arraySlice.slice(0, 3);
arrNewSlice2 = arraySlice.slice(-5, -2);
arrNewSlice3 = arraySlice.slice(3);
arrNewSlice4 = arraySlice.slice(-2);

console.log('Метод slice - новый массив  [1, 2, 3]', arrNewSlice1);
console.log('Метод slice - новый массив  [1, 2, 3]', arrNewSlice2);
console.log('Метод slice - новый массив  [4, 5]', arrNewSlice3);
console.log('Метод slice - новый массив  [4, 5]', arrNewSlice4);

//Работа с sort

let arrSort = [3, 4, 1, 2, 7];

console.log('Сортировка массива [3, 4, 1, 2, 7]', arrSort.sort());

//Работа с Object.keys

let obj = {js:'test', 
           jq: 'hello', 
           css: 'world'
        };

arrKey = Object.keys(obj);

console.log('Массив ключей объекта', arrKey);


///сделает полную копию исходного объекта
const info = {
    formatted_address : "Washington Square, New York, NY 10012, Сполучені Штати Америки",
    geometry: {
       location: {
          lat: 40.7308838,
          lng: -73.997332
       },
       viewport: {
          northeast: {
             lat: 40.7333674,
             lng: -73.99379435000002
          },
          southwest: {
             lat: 40.72847220000001,
             lng: -74.00132615
          }
       }
    },
    name: "Washington Square Park"
  };

  const copyArr = obj => {
    if (obj === null) {

      return null;  
    } 
    
    let copyObj = Object.assign({}, obj);
  
    Object.keys(copyObj).forEach(

      key =>
        (copyObj[key] =
          typeof obj[key] === "object" ? copyArr(obj[key]) : obj[key])
    );
  
    return Array.isArray(obj) && obj.length
      
      ? (copyObj.length = obj.length) && Array.from(copyObj)
      
      : Array.isArray(obj)
      
      ? Array.from(obj)
      
      : copyObj;
  };
  
  let objNew = copyArr(info);

  console.log('Исходный объект --> ', info);
  console.log('Копия объекта --> ', objNew);
  



