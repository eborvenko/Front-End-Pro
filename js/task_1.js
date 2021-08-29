////////Вариант через цикл
console.log('Вариант через цикл')

function maxArray(input){
    var max = input[0];
    
    if (!input.length) return -1;

    for (var i = 1; i < input.length; i++){
      if (input[i] > max){
        max = input[i];   
      }
     }
   return max;
}

console.log('через циклы: maxArray([]) --> ', maxArray([]));
console.log('через циклы: maxArray([8]) --> ', maxArray([8]));
console.log('через циклы: maxArray([8, 17]) --> ', maxArray([8, 17]));
console.log('через циклы: maxArray([1, 8, 37, 5, 17]) --> ', maxArray([1, 8, 37, 5, 17]));


///////// Вариант через рекурсию №1
console.log('Вариант через рекурсию №1');

const maxRecursion = (arr) => {

    const findMaxValue = (arr, maxRecursion, idx = 0) => {

      max_v = arr[idx] > maxRecursion ? arr[idx] : maxRecursion;
  
      if (arr.length - 1 === idx) {
        return max_v;
      }
  
      return findMaxValue(arr, max_v, idx + 1);
    };
  
    if (!arr.length) return -1;
  
    //предроложим, что первое значение максимальное
    max_v = findMaxValue(arr, arr[0]);
  
    return max_v;
  };
  
  console.log('через рекурсию: maxRecursion([]) --> ', maxRecursion([]));
  console.log('через рекурсию: maxRecursion([8]) --> ', maxRecursion([8]));
  console.log('через рекурсию: maxRecursion([8, 17]) --> ', maxRecursion([8, 17]));
  console.log('через рекурсию: maxRecursion([1, 8, 37, 65, 17]) --> ', maxRecursion([1, 8, 37, 65, 17]));
 

///////// Вариант через рекурсию №2
console.log('Вариант через рекурсию №2');

function recursiveMaxNumber(arrayRecursion){ 
  if (!arrayRecursion.length) return -1;

  if(arrayRecursion.length === 1){
    return arrayRecursion[0];
    }

  else{

    if(arrayRecursion[0]>=arrayRecursion[arrayRecursion.length-1]) {
      arrayRecursion.pop();
      return recursiveMaxNumber(arrayRecursion); 
    }

    else {
      return recursiveMaxNumber(arrayRecursion.slice(1));
      }
    }
}

console.log('через рекурсию №2: recursiveMaxNumber([]) --> ', recursiveMaxNumber([]));
console.log('через рекурсию №2: recursiveMaxNumber([3]) --> ', recursiveMaxNumber([3]));
console.log('через рекурсию №2: recursiveMaxNumber([25, 12]) --> ', recursiveMaxNumber([25, 12]));
console.log('через рекурсию №2: recursiveMaxNumber([2, 22, 83, 3, 4, 44, 33, 55]) --> ', recursiveMaxNumber([2, 22, 83, 3, 4, 44, 33, 55]));

///////// Вариант через рекурсию №3
console.log('Вариант через рекурсию №3');

const maxValue = (arr, maxv = -1) => {
  if (arr.length === 0) return maxv;

  maxv = maxv < arr[0] ? arr[0] : maxv;

  return maxValue(arr.slice(1), maxv);
};

console.log('через рекурсию №3: maxValue([]) --> ', maxValue([]));
console.log('через рекурсию №3: maxValue([8]) --> ', maxValue([8]));
console.log('через рекурсию №3: maxValue([59, 80]) --> ', maxValue([59, 80]));
console.log('через рекурсию №3: maxValue([27, 0, 14, 44, 33, 5]) --> ', maxValue([27, 0, 14, 44, 33, 5]));
