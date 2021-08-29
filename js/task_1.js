////////Вариант через цикл

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


console.log('//////////');

///////// Вариант через рекурсию
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
 