import { hexToRgbA, getId } from './utils';

/**
 * Template
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const base = (cfg) => {
  return `<div class="p5ct p5ct-${cfg.id} dir-${cfg.direction} p5ct-${cfg.position} minimized-${cfg.minimized} base-size-${cfg.baseSize} ctrl-size-${cfg.ctrlSize} theme-${cfg.theme}">
            <div class="p5ct-header" style="${cfg.headerStyle}">
              <button class="p5ct-minimize"></button>
              <button class="p5ct-toggle-dir"></button>
            </div>
            <div class="p5ct-content"> </div>
            <div class="p5ct-label">
              <p class="p5ct-base-label">&nbsp;</p>
              <p class="p5ct-value-label"></p>
            </div>
          </div>`;
}

/**
 * Template
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const styleTheme = (cfg) => {
  return `<style>
            .p5ct-${cfg.id}.p5ct {
              background: ${cfg.bgColor};
            }
            .p5ct-${cfg.id} .p5ct-header {
              background: ${cfg.fgColor};
            }
            .p5ct-${cfg.id} .p5ct-slider-js {
              background: ${cfg.fgColor};
            }
            .p5ct-${cfg.id} .p5ct-xypad span {
              background: ${cfg.fgColor};
            }
            .p5ct-${cfg.id} .p5ct-xpad em {
              background: ${cfg.fgColor};
            }
            .p5ct-${cfg.id} .p5ct-ypad em {
              background: ${cfg.fgColor};
            }

          </style>`;
}

/**
 * Template
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const styleBaseSize = (cfg) => {
  let intSize = cfg.baseSize - 10;
  return `<style>
            .p5ct {
              width: ${cfg.baseSize}px;
            }
            .p5ct.dir-h, .p5ct.dir-horizontal {
              width: auto;
              height: ${cfg.baseSize + 30}px;
            }
            .p5ct-${cfg.id} .p5ct-xypad {
              width: ${intSize}px;
              height: ${intSize}px;
            }
            .p5ct-${cfg.id} .p5ct-xpad {
              width: ${intSize}px;
            }
            .p5ct-${cfg.id} .p5ct-xpad span {
              left: ${intSize}px;
            }
            .p5ct-${cfg.id} .p5ct-xpad em {
              width: ${intSize}px;
              margin-left: -${intSize}px;
            }
            .p5ct-${cfg.id} .p5ct-ypad {
              height: ${intSize}px;
            }
            .p5ct-${cfg.id} .p5ct-ypad em {
              height: ${intSize}px;
              margin-bottom: -${intSize}px;
            }
            .p5ct-${cfg.id} .p5ct-input {
              width: ${intSize}px;
            }
          </style>`;
}

/**
 * Template
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const styleCtrlSize = (cfg) => {
  return `<style>
            .p5ct-${cfg.id} .p5ct-xypad span {
              width: ${cfg.ctrlSize}px;
              height: ${cfg.ctrlSize}px;
              margin: -${cfg.ctrlSize/2}px 0 0 -${cfg.ctrlSize/2}px;
            }
            .p5ct-${cfg.id} .p5ct-xpad {
              height: ${cfg.ctrlSize}px;
            }
            .p5ct-${cfg.id} .p5ct-xpad span {
              height: ${cfg.ctrlSize}px;
            }
            .p5ct-${cfg.id} .p5ct-xpad em {
              width: ${intSize}px;
              height: ${cfg.ctrlSize}px;
              margin-left: -${intSize}px;
            }
            .p5ct-${cfg.id} .p5ct-ypad {
              width: ${cfg.ctrlSize}px;
            }
            .p5ct-${cfg.id} .p5ct-ypad span {
              width: ${cfg.ctrlSize}px;
            }
            .p5ct-${cfg.id} .p5ct-checkbox label {
              height: ${cfg.ctrlSize}px;
            }
          </style>`;
}


/**
 * Template XY PAD
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const xypad = (cfg) => {
  return `<div class="p5ct-ctrl p5ct-pad p5ct-xypad" data-dir="xy" style="${cfg.baseStyle}"><span style="${cfg.ctrlStyle}"><em></em></span><p></p></div>`;
}

/**
 * Template X PAD
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const xpad = (cfg) => {
  return `<div class="p5ct-ctrl p5ct-pad p5ct-xpad" data-dir="x" style="${cfg.baseStyle}"><span style="left: ${cfg.controllerX}px"><em style="${cfg.ctrlStyle}"></em></span><p></p></div>`;
}

/**
 * Template Y PAD
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const ypad = (cfg) => {
  return `<div class="p5ct-ctrl p5ct-pad p5ct-ypad" data-dir="y" style="${cfg.baseStyle}"><span style="top: ${cfg.controllerY}px"><em style="${cfg.ctrlStyle}"></em></span><p></p></div>`;
}

/**
 * Template
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const text = (cfg) => {
  return `<input type="text" class="p5ct-ctrl p5ct-input p5ct-text" readonly="${cfg.readOnly}" disabled="${cfg.disabled}" style="${cfg.baseStyle}" value="${cfg.value}" />`;
}

/**
 * Template
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const button = (cfg) => {
  return `<button class="p5ct-ctrl p5ct-input p5ct-button" disabled="${cfg.disabled}" style="${cfg.baseStyle}">${cfg.label}</button>`;
}

/**
 * Template
 * @param {Objet} cfg
 * @param {?} cfg.?
 */
export const checkbox = (cfg) => {
  return `<div class="p5ct-ctrl p5ct-checkbox p5ct-input" style="${cfg.baseStyle}"><input id="${cfg.id}" disabled="${cfg.disabled}" type="checkbox" value="${cfg.value}" /><label for="${cfg.id}"><span></span>${cfg.label}</label></div>`;
}
