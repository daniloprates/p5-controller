import * as tpl from './templates';

/**
 * Converts a string into HTML element(s)
 * @param {String} html
 * @param {Boolean} dontAppend
 * @param {uniqueId} Unique elements across multiple p5Controller instances
 */
export const stringToHtml = (html, dontAppend, uniqueId) => {

  if (uniqueId && document.getElementById(uniqueId)) {
    return document.getElementById(uniqueId)
  }

  let template = document.createElement('template');
  template.innerHTML = html;
  template = template.content;

  if (!template || !template.firstChild) {
    throw new TypeError('Invalid html string');
  }

  if (dontAppend === true) {
    return template.firstChild;
  }

  return document.body.appendChild(template.firstChild);
}

/**
 * Generates a random hash id
 * @return {String} result
 */
export const getId = () => {
  const length = 32;
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
  // return new Date().getTime();
}

/**
 * Returns if the type is valid, checking it agains the constant DEFAULT_CONTROLLER_CFG
 * @return {Boolean} isValidType
 */
export const isValidType = (type, elements) => {
  if (
    typeof type !== 'string' ||
    !tpl[type] ||
    !elements[type]
  ) { return false; }
  else
    { return true; }
}

/**
 * `map` function from p5.js lib
 * https://github.com/processing/p5.js/blob/master/src/math/calculation.js
 *
 * Re-maps a number from one range to another.
 * <br><br>
 * In the first example above, the number 25 is converted from a value in the
 * range of 0 to 100 into a value that ranges from the left edge of the
 * window (0) to the right edge (width).
 *
 * @method map
 * @param  {Number} value  the incoming value to be converted
 * @param  {Number} start1 lower bound of the value's current range
 * @param  {Number} stop1  upper bound of the value's current range
 * @param  {Number} start2 lower bound of the value's target range
 * @param  {Number} stop2  upper bound of the value's target range
 * @return {Number}        remapped number
 * @example
 *   <div><code>
 *     var value = 25;
 *     var m = map(value, 0, 100, 0, width);
 *     ellipse(m, 50, 10, 10);
 *   </code></div>
 *
 *   <div><code>
 *     function setup() {
 *       noStroke();
 *     }
 *
 *     function draw() {
 *       background(204);
 *       var x1 = map(mouseX, 0, width, 25, 75);
 *       ellipse(x1, 25, 25, 25);
 *       var x2 = map(mouseX, 0, width, 0, 100);
 *       ellipse(x2, 75, 25, 25);
 *     }
 *   </code></div>
 *
 * @alt
 * 10 by 10 white ellipse with in mid left canvas
 * 2 25 by 25 white ellipses move with mouse x. Bottom has more range from X
 *
 */
export const map = (n, start1, stop1, start2, stop2) => {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

/**
 * `getWindowWidth` function from p5.js lib
 * https://github.com/processing/p5.js/blob/master/src/math/calculation.js
 */
export const getWindowWidth = () => {
  return Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0);
}

/**
 * `getWindowHeight` function from p5.js lib
 * https://github.com/processing/p5.js/blob/master/src/math/calculation.js
 */
export const getWindowHeight = () => {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0);
}

/**
 * Converts a HEX color into RGBA color
 */
export const hexToRgbA = (hex, alpha) => {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = `0x${c.join('')}`;
        return `rgba(${[(c>>16)&255, (c>>8)&255, c&255].join(',')}, ${alpha})`
    }
    throw new Error('Bad Hex');
}

// export const


export const isArray = (element) => {
  return Array.isArray(element);
}


