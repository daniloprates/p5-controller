import { getWindowWidth, getWindowHeight } from './utils';

// Constants
export const DRAGGABLE_OPTIONS = {
  // grid: 10,
  // onDrag: function(){ ... }
}

// Default values for the configuration
export const DEFAULT_SIZE = 150;
export const DEFAULT_CTRL_SIZE = 20;
export const DEFAULT_VALUE = 75;

export const DEFAULT_BASE_CFG = {
    direction: 'vertical',
    size: DEFAULT_SIZE,
    ctrlSize: DEFAULT_CTRL_SIZE,
    value: DEFAULT_VALUE,
    color: '#999999',
    fgColor: '#ED225D',
    bgColor: '#908f7f',
    sdColor: '#2D7BB6',
    position: 'tl',
    theme: 'p5',
    baseSize: 'normal',
    ctrlSize: 'normal',
    minimized: false
}

export const DEFAULT_CONTROLLER_CFG = {
  base: {
    minX: 0,
    minY: 0,
    maxX: getWindowWidth(),
    maxY: getWindowHeight(),
    value: 0,
    readOnly: false,
    disabled: false,
  },
  xypad: {
    name: 'xypad',
    ctrlWidth: 20,
    ctrlHeight: 20
  },
  xpad: {
    name: 'xpad',
    ctrlWidth: 0,
  },
  ypad: {
    name: 'ypad',
    ctrlHeight: 0
  },
  text: {
    value: ''
  },
  button: {
    label: 'Button'
  },
  checkbox: {
    label: 'Checkbox',
    value: true
  }
}

export const DEFAULT_CONTROLLERS_CFG = Object.assign(
  DEFAULT_CONTROLLER_CFG,{
    n: 2
  }
);

export const DRAGGABLE_CONTROLLERS = {
  'xypad' : true,
  'xpad' : true,
  'ypad' : true
}

export const BASE_DRAGGABLE = (header) => {
  return {
    handle: header,
    onDragEnd: (el, x, y, e) => {
      this.dragged = true;
      setTimeout(() => {this.dragged = false},10);
      e.preventDefault();
      return false;
    }
  }
}

export const SIZES = {
  'normal' : {
    base: 160,
    ctrl: 25,
    margin: 5
  },
  small: {
    base: 110,
    ctrl: 15,
    margin: 5
  },
  'x-small': {
    base: 60,
    ctrl: 7,
    margin: 3
  },
  large: {
    base: 210,
    ctrl: 30,
    margin: 10
  },
  'x-large': {
    base: 260,
    ctrl: 40,
    margin: 10
  },


}

