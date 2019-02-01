import { map } from './utils';
import * as cnt from './constants';

export const ctrlToValue = (newElement, cfg, e) => {

  if (typeof cfg.baseSize == 'string') {
    cfg.baseSize = cnt.SIZES[cfg.baseSize].base;
  }
  if (typeof cfg.ctrlSize == 'string') {
    cfg.ctrlSize = cnt.SIZES[cfg.ctrlSize].ctrl;
  }

  let target = e.target;
  let cursorOffsetX = e.offsetX - ((cfg.ctrlWidth/2) || 0);
  let cursorOffsetY = e.offsetY - ((cfg.ctrlHeight/2) || 0);
  let max = cfg.baseSize - 10;
  let x, y;

  if (target.className && target.className.indexOf('p5ct-pad') > -1) {
    target = target.childNodes[0];
  } else if (target.tagName == 'EM') {
    target = target.parentNode;
    direction = target.parentNode.getAttribute('data-dir');
    cursorOffsetX = cursorOffsetX - (max - target.offsetLeft);
    cursorOffsetY = cursorOffsetY + target.offsetTop;
  }

  let direction = target.parentNode.getAttribute('data-dir');
  let hasX = direction.indexOf('x') > -1;
  let hasY = direction.indexOf('y') > -1;
  let result = {
    target: target
  };

  if (hasX) {
    let newX = parseInt(map(cursorOffsetX, 0, max, cfg.minX, cfg.maxX ));// + newElement.controllerX
    result.x = newX;
    result.controllerX = cursorOffsetX;
  }
  if (hasY) {
    var newY;
    if (cfg.type == 'ypad') {
      newY = parseInt(map(cursorOffsetY, 0, max, cfg.maxY, cfg.minY ));// + newElement.controllerY
    } else {
      newY = parseInt(map(cursorOffsetY, 0, max, cfg.minY, cfg.maxY ));// + newElement.controllerY
    }
    result.y = newY;
    result.controllerY = cursorOffsetY;
  }

  return result;

}

export const ctrlClick = (newElement, cfg, e) => {
    // console.log('cfg', cfg);

  // return false;

  if (e.target.tagName == 'SPAN') {
    return false;
  }

  if (newElement.dragged) {
    newElement.dragged = false;
    return false;
  }

  let result = ctrlToValue(newElement, cfg, e);
  let labelValue = [];

  if (result.x) {
    result.target.style.left = `${result.controllerX}px`;
    newElement.controllerX = result.controllerX;
    newElement.x = result.x;
    labelValue.push(`x: ${result.x}`);
  }
  if (result.y) {
    result.target.style.top = `${result.controllerY}px`;
    newElement.controllerY = result.controllerY;
    newElement.y = result.y;
    labelValue.push(`y: ${result.y}`);
  }

  showLabel(cfg, labelValue.join(', '));

}

export const ctrlMove = (newElement, cfg, e) => {

  if (newElement.dragged) {
    newElement.dragged = false;
    return false;
  }

  let result = ctrlToValue(newElement, cfg, e);
  let labelValue = [];

  if (result.x) {
    // cfg.cross.style.left = `${result.controllerX}px`;
    // labelValue.push(`<em> x: ${result.x}</em> x: ${newElement.x}`);
    // labelValue.push(`x: ${newElement.x} (<em>${result.x}</em>)`);
    labelValue.push(`x: <em>${result.x}</em>`);
  }
  if (result.y) {
    // cfg.cross.style.top = `${result.controllerY}px`;
    // labelValue.push(`<em> y: ${result.y}</em> y: ${newElement.y}`);
    // labelValue.push(`y: ${newElement.y} (<em>${result.y}</em>)`);
    labelValue.push(`y: <em>${result.y}</em>`);
  }

  showLabel(cfg, labelValue.join(', '));

}

export const ctrlOver = (newElement, cfg, e) => {

  return false;

  if (newElement.dragged) {
    newElement.dragged = false;
    return false;
  }

  let result = ctrlToValue(newElement, cfg, e);
  let labelValue = [];

  if (result.x) {
    // result.target.style.left = `${result.controllerX}px`;
    // newElement.controllerX = result.controllerX;
    // newElement.x = result.x;
    labelValue.push(`x: ${newElement.x}`);
  }
  if (result.y) {
    // result.target.style.top = `${result.controllerY}px`;
    // newElement.controllerY = result.controllerY;
    // newElement.y = result.y;
    labelValue.push(`y: ${newElement.y}`);
  }

  showLabel(cfg, labelValue.join(', '));

}

export const ctrlDrag = (el, dragX, dragY, ev, newElement, cfg) => {

  newElement.controllerX = dragX;
  newElement.controllerY = dragY;

  if (typeof cfg.baseSize == 'string') {
    cfg.baseSize = cnt.SIZES[cfg.baseSize].base;
  }
  if (typeof cfg.ctrlSize == 'string') {
    cfg.ctrlSize = cnt.SIZES[cfg.ctrlSize].ctrl;
  }

  let direction = el.parentNode.getAttribute('data-dir');

  newElement.dragged = true;
  setTimeout(() => {newElement.dragged = false},10);

  let hasX = direction.indexOf('x') > -1;
  let hasY = direction.indexOf('y') > -1;
  let labelValue = [];

  if (hasX) {
    dragX = parseInt(map(dragX, 0, (cfg.baseSize - cfg.ctrlSize - 10), cfg.minX, cfg.maxX ));// + newElement.controllerX
    newElement.x = dragX;
    cfg.x = dragX;
    labelValue.push(`x: ${dragX}`);
  }
  if (hasY) {
    if (cfg.type == 'ypad') {
      dragY = parseInt(map(dragY, 0, (cfg.baseSize - cfg.ctrlSize - 10), cfg.maxY, cfg.minY ));// + newElement.controllerX
    } else {
      dragY = parseInt(map(dragY, 0, (cfg.baseSize - cfg.ctrlSize - 10), cfg.minY, cfg.maxY ));// + newElement.controllerX
    }
    newElement.y = dragY;
    cfg.y = dragY;
    labelValue.push(`y: ${dragY}`);
  }

  showLabel(cfg, labelValue.join(', '));

}

export const showLabel = (cfg, value) => {
  // cfg.label.style.display = 'block';
  if (typeof value == 'string') {
    cfg.baseLabel.innerHTML = cfg.name;
    cfg.valueLabel.innerHTML = value;
  }

}

export const hideLabel = (cfg, e) => {
  if (e.relatedTarget && e.relatedTarget.className.indexOf('p5ct-ctrl') > -1) {
    return false;
  }
  // console.log('e', e);
  // e.preventDefault();
  // cfg.baseLabel.innerHTML = '';
  // cfg.valueLabel.innerHTML = '';
}
