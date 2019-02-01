// Dependencies
import gator from 'gator';
import Draggable from 'draggable';
// import Draggable from './libs/draggable-dhp';

// Modules
import { stringToHtml, getId, isValidType, ctrlClick, map, valueToCtrlValue, isArray } from './components/utils';
import * as tpl from './components/templates';
import * as cnt from './components/constants';
import * as act from './components/actions';

// import
let baseStyle = require("!css?minimize!sass!./scss/style.scss");

/*
 * p5Controller class
 * @param {Object} cfg
 * @param {String} cfg.direction  - default: vertical - vertical | horizontal
 * @param {String} cfg.size       - default: 150px - To be used as `width` for the VERTICAL direction and as `height` for the HORIZONTAL direction
 * @param {String} cfg.color      - default: #999999  - Text Color
 * @param {String} cfg.fgColor    - default: #ED225D  - Foreground Color
 * @param {String} cfg.bgColor    - default: #F0EFE4  - Background Color
 * @param {String} cfg.sdColor    - default: #2D7BB6  - Secondary Color
 * @param {String|Array} cfg.position - default: tl   - tl (top left), tr (top right), bl (bottom left), br (bottom right), [`${xPosition}px`, `${yPosition}px`]
 *
 */
 class p5Controller {
  constructor(userCfg={}, singleValue) {

    // If the cfg has 1 paramater, it can be passed directly, e.g.
    // new p5Controller('position','tr');
    if (typeof userCfg == 'string' && singleValue) {
      var singleProp = userCfg;
      userCfg = {}
      userCfg[singleProp] = singleValue
    }
    console.log('userCfg', userCfg);

    // p5Controller instance config
    this.cfg = Object.assign({}, cnt.DEFAULT_BASE_CFG, userCfg);
    this.cfg.id = getId();

    // Append the SCSS
    this.baseStyle = stringToHtml(`<style id="baseStyle">${baseStyle.toString()}</style>`, false, 'baseStyle');

    // Base HTML template
    this.base = stringToHtml(tpl.base(this.cfg));

    // CSS Template if custom colors
    if (userCfg.fgColor || userCfg.bgColor || userCfg.color) {
      this.styleTheme = stringToHtml(tpl.styleTheme(this.cfg));
    }

    // CSS Template for base custom sizes
    if (typeof this.cfg.baseSize == 'number') {
      this.styleBaseSize = stringToHtml(tpl.styleBaseSize(this.cfg));
    }

    // CSS Template for controllers custom sizes
    if (typeof this.cfg.ctrlSize == 'number') {
      this.styleCtrlSize = stringToHtml(tpl.styleCtrlSize(this.cfg));
    }

    // Gets some needed HTML elements
    this.cfg.label = this.base.getElementsByClassName('p5ct-label')[0];
    this.cfg.baseLabel = this.base.getElementsByClassName('p5ct-base-label')[0];
    this.cfg.valueLabel = this.base.getElementsByClassName('p5ct-value-label')[0];
    this.container = this.base.getElementsByClassName('p5ct-content')[0];
    this.header = this.base.getElementsByClassName('p5ct-header')[0];

    // Events biding
    Gator(this.base).on('click', '.p5ct-minimize', this.toggleMinimize.bind(this));
    Gator(this.base).on('click', '.p5ct-toggle-dir', this.toggleDirection.bind(this));
    Gator(this.base).on('mouseover', '.p5ct-pad', act.showLabel.bind(this, this.cfg));
    Gator(this.base).on('mouseout', '.p5ct-pad', act.hideLabel.bind(this, this.cfg));

    this.baseDraggableAct();

  }

  baseDraggableAct () {
    if (this.cfg.direction == 'h' || this.cfg.direction == 'horizontal') {
      /**
        TODO:
        - Implement the draggable for the horizontal layout
       */

      return false;
    }
    if (this.baseDraggable) {
      this.baseDraggable.destroy();
    }

    this.baseDraggable = new Draggable (this.base, {
      handle: this.header,
      setPosition: false,
      onDragEnd: (el, x, y, e) => {
        this.dragged = true;
        setTimeout(() => {this.dragged = false},10);
        e.preventDefault();
        return false;
      }
    });

  }

  toggleDirection() {
    /**

      TODO:
      - Better control if it was dragged
      - e.preventDefault didn't work
     */
    if (this.dragged) {
      return;
    }

    this.cfg.direction = (this.cfg.direction == 'v' || this.cfg.direction == 'vertical')
    ? 'horizontal'
    : 'vertical';

    this.base.className = this.base.className.replace(/(dir-)([a-z]+)/, `dir-${this.cfg.direction}`);

    /**
      TODO:
      - horrible class toggle.
      - please change.
     */
    this.base.className.indexOf('dir-vertical') > -1
    ? this.base.className = this.base.className.replace('dir-vertical','') + ' dir-horizontal'
    : this.base.className = this.base.className.replace('dir-horizontal','') + ' dir-vertical';
  }

  toggleMinimize() {

    /**

      TODO:
      - Better control if it was dragged
      - e.preventDefault didn't work
     */
    if (this.dragged) {
      return;
    }

    this.cfg.minimized = !this.cfg.minimized;
    this.base.className = this.base.className.replace(/(minimized-)([a-z]+)/, `minimized-${this.cfg.minimized}`);
  }

  /**
   * Adds multiple controllers
   * @params {String|Array} type - controllers type or types
   * @params {Object} userCfg
   * @params {Number} n - number of controllers to be created (same type)
   * @params {Function} beforeCreate - Function to be trigged right before a controller is created
   * @params {Function} afterCreate - Function to be trigged right after a controller is created
   * * All other parameters from `createController`
   * @return {Array} controllers
   *
   * Examples:
   *
   * - Controllers of same type:
   *
   *     createControllers('xpad'); // Creates 2 `xpad`s
   *     createControllers('ypad', 5); // Creates 5 `ypad`s
   *     createControllers('xypad', {  // Creates 10 `xypad`s with the same custom config.
   *       n: 10,
   *
   *     });
   *
   * - Multiples types:
   *
   *     createControllers(['button', 'text', 'checkbox']);
   *
   *     createControllers(['xypad', 'xpad', 'ypad'], {
   *       x: 500 // will be applied to the `xypad` and `xpad`
   *       y: 500 // will be applied to the `xypad` and `ypad`
   *     });
   */
  createControllers(type, userCfg) {

    if (typeof userCfg == 'number') {
      userCfg = {n: userCfg}
    }

    let cfg = Object.assign({}, cnt.DEFAULT_CONTROLLERS_CFG, userCfg);

    let newCfg;
    let newElements = [];
    const beforeCreate = (i) => {
      cfg.index = i;
      if (cfg.beforeCreate) {
        newCfg = cfg.beforeCreate.call(null, cfg);
        if (typeof newCfg == 'object') {
          cfg = Object.assign(cfg,newCfg);
        }
      }
    }
    const afterCreate = (i) => {
      cfg.index = i;
      if (cfg.afterCreate) {
        newCfg = cfg.afterCreate.call(null, cfg);
        if (typeof newCfg == 'object') {
          cfg = Object.assign(cfg,newCfg);
        }
      }
    }
    let i = 0;
    let length = (isArray(type)) ? type.length : cfg.n;

    do {
      let tp = (isArray(type)) ? type[i] : type;
      beforeCreate(i);
      newElements.push(this.createController(tp, cfg));
      afterCreate(i);
      i++;
    } while ( i < length );


    return newElements;

  }

  /**
   * Add a single controller
   * @param {String} type
   * @param {Object} cfg
   * @param {Number} [cfg.name=`controller.type`] - Controller name
   * @return {Object} controller
   *
   * Specific parameters for each controller type:
   *
   * PADS
   * @param {Number} [cfg.minX=0] - Minimum X value - available for `xypad` and `xpad`
   * @param {Number} [cfg.minY=0] - Minimum Y value - available for `xypad` and `ypad`
   * @param {Number} [cfg.maxY=`window.width`] - Maximum X value - available for `xypad` and `xpad`
   * @param {Number} [cfg.maxY=`window.height`] - Maximum Y value - available for `xypad` and `ypad`
   * @param {String} [baseStyle] - custom style for the controller container html
   * @param {String} [ctrlStyle] - custom style for the controller controller html
   *
   * INPUTS
   * @param {String} [label] - Label for the checkbox controller
   * @param {String} [Value] - Value for the button
   *
   */
  createController(type, userCfg={}) {

    if (!isValidType(type, cnt.DEFAULT_CONTROLLER_CFG)) {
      return console.warn(`${type} is not a valid element`, type)
    }

    let cfg = Object.assign({},
      cnt.DEFAULT_CONTROLLER_CFG.base,
      this.cfg,
      cnt.DEFAULT_CONTROLLER_CFG[type],
      userCfg
    );

    if (typeof cfg.baseSize == 'string') {
      cfg.baseSize = cnt.SIZES[cfg.baseSize].base;
    }
    if (typeof cfg.ctrlSize == 'string') {
      cfg.ctrlSize = cnt.SIZES[cfg.ctrlSize].ctrl;
    }

    cfg.x = cfg.x || cfg.maxX / 2;
    cfg.y = cfg.y || cfg.maxY / 2;
    cfg.controllerX = map(cfg.x, cfg.minX, cfg.maxX, 0, cfg.baseSize) - (cfg.ctrlSize/2);
    cfg.controllerY = map(cfg.y, cfg.minY, cfg.maxY, 0, cfg.baseSize) - (cfg.ctrlSize/2);
    cfg.type = type;

    let newElement = {
      x : cfg.x,
      y : cfg.y,
      controllerX : cfg.x,
      controllerY : cfg.y
    };

    cfg.id = getId();

    /**
      TODO:
      - Check if the element is really html and has a child
      - Put this in utils
     */
    // if (!element.children || !element.children[0] || element.children[0].tagName == 'DIV') {
    //   throw new TypeError('There was an error creating this element');
    // }

    let element = stringToHtml(tpl[type](cfg));
    // cfg.cross = element.getElementsByTagName('p')[0];
    this.container.appendChild(element);

    let isPad = element.className.indexOf('p5ct-pad') > -1;

    if (isPad) {
      Gator(element).on('mousedown', act.ctrlClick.bind(this, newElement, cfg));
      Gator(element).on('mouseover', act.ctrlOver.bind(this, newElement, cfg));
      Gator(element).on('mousemove', act.ctrlMove.bind(this, newElement, cfg));

      if (cnt.DRAGGABLE_CONTROLLERS[type]) {
        new Draggable (element.children[0], {
          handle: element,
          onDrag: (el, dragX, dragY, ev) => {
            act.ctrlDrag(el, dragX, dragY, ev, newElement, cfg);
          },
          limit: element
        });
      }
    }

    newElement.element = element;

    return newElement;
  }

}

/**
  TODO:
  - Proper UMD shield
 */
if (!window.module) {
  window.p5Controller = p5Controller;
}
