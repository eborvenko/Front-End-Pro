// 'use strict';

let width = 150;
let count = 3;

const list = slider.querySelector('ul');
const listElems = slider.querySelectorAll('li');
const arrowPrev = slider.querySelector('.arrow-prev');
const arrowNext = slider.querySelector('.arrow-next');

let position = 0;

arrowPrev.onclick = function () {
    position += width;
    position = Math.min(position, 0);
    list.style.marginLeft = position + 'px';
};

arrowNext.onclick = function () {
    position -= width;
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
};
