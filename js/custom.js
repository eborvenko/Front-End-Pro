console.log('/-------------функция rgb----------------------/');


function rgb(red, green, blue) {
    var _red = parseInt(red, 10);

    if (isNaN(_red)) _red = 0;
  
    var _green = parseInt(green, 10);

    if (isNaN(_green)) _green = 0;
  
    var _blue = parseInt(blue, 10);

    if (isNaN(_blue)) _blue = 0;
  
    return `rgb(${_red},${_green},${_blue})`;
}
  
console.log('rgb() --> ', rgb());
console.log('rgb(125) -->', rgb(125));
console.log('rgb(1, 235) -->', rgb(1, 235));
console.log('rgb(185, 152, 353) -->', rgb(185, 152, 353));  
console.log('rgb(1, null, 1) -->',rgb(1, null, 1));
console.log('rgb(null, 102, 118) -->', rgb(null, 102, 118));
console.log('rgb(null, null, 1) -->', rgb(null, null, 1));


console.log('/-------------функция words----------------------/');


function words(n = 0)  {
    var d = ''; 

    if (!n) {
        n = 0;
    }

    if (n >= 0 && n <= 50) { 
        if (n % 10 === 1 && n!=11) {
            d = 'товар';
        }

        else if ((n % 10 === 2 && n!=12) ||
                 (n % 10 === 3 && n!=13) || 
                 (n % 10 === 4 && n!=14) ) {
            d = 'товара';
        }

        else {
            d = 'товаров';
        }
        
        return n + ' ' + d;
    }
      
    else {
          console.log(n, 'Что-то пошло не так')
      }      
}

console.log ('0 -->', words(0));
console.log ('6 -->', words(6));
console.log ('19 -->', words(19));
console.log ('41 -->', words(41));
console.log ('23 -->', words(23));
console.log ('35 -->', words(35));
console.log ('() -->', words());
console.log ('51 -->', words(51));
console.log ('null -->', words(null));