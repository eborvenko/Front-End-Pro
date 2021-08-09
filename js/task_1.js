var ages;

do {
  ages = Number(prompt('Ваш возраст? (числовое значение)'));
} while ((Number.isNaN(ages) || (ages === 0 || ages === null)));

console.log ('ages--> ', ages);

var smoke = confirm('Вы курите?');

console.log ('smoke--> ', smoke);

if (ages < 18 && smoke == false) {
  alert('Так держать!');
} else if (ages < 18 && smoke == true) {
  alert('Маме раскажу');
} else if (ages >= 18 && smoke == false) {
  alert('Молодец, и не надо');
} else if (ages >= 18 && smoke == true) {
  alert('Ну и зря');
}
 