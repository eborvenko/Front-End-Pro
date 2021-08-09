function isLannisterSoldier(color, lion){
    if (!color) {
        throw  "Цвет не указан!";
    }
    return ((color === 'red' && !lion) || lion === 'lion');
}
 
    console.log('red lion -->', isLannisterSoldier('red', 'lion'));
    console.log('blue  -->', isLannisterSoldier('blue', null));
    console.log('red man -->', isLannisterSoldier('red', 'man'));
    console.log('green lion -->', isLannisterSoldier('green', 'lion'));
    console.log('blue lion -->', isLannisterSoldier('blue', 'lion'));
    console.log('red  -->', isLannisterSoldier('red', null));
    //console.log('empty lion -->', isLannisterSoldier('', 'lion'));
