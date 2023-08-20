/* eslint-disable no-unused-vars */
import slider from './js/slider';
import * as burger from './js/burger';

let resizeTimeout;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(slider, 50);
});

document.addEventListener('DOMContentLoaded', () => {
  slider();
});
