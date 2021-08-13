for (var i = 1 ; i <= 10; i++) {
    var result = [];

    for (var j = 1; j <= 10; j++) {
        result.push(j * i);
        console.log(i + ' * ' + j, ' = ', result[result.length - 1]) ;
    }
    
    console.log("--/--/--/--/--/");
}
