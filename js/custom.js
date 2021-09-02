  function createCalculator(a) {
    let num = a;

    return {
        add: (b) => {
            if (isNaN(b)) {

               return console.log('NaN'); 
            }

            console.log(num = num + b);
        },
        sub: (b) => {
            if (isNaN(b)) {

               return console.log('NaN'); 
            } 
            
            console.log(num = num - b);
        },
        set: (b) => {
            if (isNaN(b)) {

                return console.log('NaN'); 
             } 
             
             console.log(num = b);
        },        
        get: (b) => console.log(num),
    }
  }
  
  const calculator = createCalculator(100);
  
  calculator.add(10); // 110
  calculator.add(10); // 120
  calculator.sub(20); // 100
 
  calculator.set(20); //
  calculator.add(10); // 30
  calculator.add(10); // 40
  calculator.add('qwe'); // NaN и значение 40 не менять
  calculator.get(); // 40



