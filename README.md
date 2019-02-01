# p5 Controller

> Quick create controllers for p5.js

![Deprecated](https://placehold.it/600x50/f03c15/000000?text=This%20package%20has%20been%20deprecated)


## Getting Started

* Download the [p5.controller.min.js][p5ctrlMinJs] file and reference it at the end of your HTML body

* In your sketch:

```js

 // declare the variables
  var p5ct, // p5-controller instance
      ct; // your controllers

  var size;

  function setup() {
    size = 300;

    // Create a p5-controller instance:
    p5ct = new p5Controller('position','tr');

    // Create your controller
    ct = p5ct.createController('xypad');

    createCanvas(size, size);
  }

  function draw() {
    // now you can use the `ct.x` and `ct.y` variables

    fill(map(ct.x, 0, size, 0, 255));

    stroke(map(ct.y, 0, size, 255, 0));

    ellipse(
      size / 2,
      size / 2,
      ct.x,
      ct.y
    );
  }


```

See the [list of the p5Controller options](#p5controller-instance-options)
See the [list of the controllers options](#controllers-options)

## Creating Controllers

```js

  // Create a single controller with default configuration:
  var myXYpad = myCtrl.createController('xypad');

  // Create a single controller with custom configuration:
  var myXYpad = myCtrl.createController('xypad',{
    maxX: 600,
    maxY: 400
  });

  // Create 2 controllers with default configuration, same type:
  var myXYpad = myCtrl.createControllers('xypad');

  // Create `n` controllers with default configuration, same type:
  var myXYpad = myCtrl.createControllers('xypad', 5);

  // Create multiple controllers of different types, default configuration
  var myXYpad = myCtrl.createControllers({
    types: ['xpad', 'ypad', 'button']
  });

  // Create multiple controllers with custom configuration, same type
  var myYpads = myCtrl.createControllers('ypad',{
    minY: 300,
    maxY: 600
  });

```


## Controllers

* XYPad

* Xpad

* Ypad

* Text

* Button

* Checkbox



## Options


<!--
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
 */
-->

### p5Controller instance options

| Option      | Type      | Default      | Description      |
| --- | --- | --- | --- |
| **theme**  | `String` | `p5` | See the [list of themes][##Themes] |
| **direction&lowast;**  | `String` | `vertical` | vertical &#124; horizontal |
| **position&lowast;&lowast;**  | `String` | `tl` | p5controller initial position in the screen <br> `tl` top-left <br> `tr` top-right <br> `br` botton-right <br> `bl` bottom-left |


&lowast; - The `horizontal` direction is development and might break with `xpad`s.

&lowast;&lowast; - The right and bottom positions are still in development and might break depending on the controller configurations

### Controllers options

<!--
   * Add a single controller
   * @param {String} type
   * @param {Object} cfg
   * @param {Number} [cfg.name=`element.type`] - Element name
   * @return {Object} element
   *
   * Specific parameters for each element type:
   *
   * PADS
   * @param {Number} [cfg.minX=0] - Minimum X value - available for `xypad` and `xpad`
   * @param {Number} [cfg.minY=0] - Minimum Y value - available for `xypad` and `ypad`
   * @param {Number} [cfg.maxY=`window.width`] - Maximum X value - available for `xypad` and `xpad`
   * @param {Number} [cfg.maxY=`window.height`] - Maximum Y value - available for `xypad` and `ypad`
   * @param {String} [baseStyle] - custom style for the element container html
   * @param {String} [ctrlStyle] - custom style for the element controller html
   *
   * INPUTS
   * @param {String} [label] - Label for the checkbox and button elements
   * @param {String} [Value] - Value for the text button
   * @param {Boolean} readOnly - default: false - text only
   * @param {Boolean} disabled - default: false
   */
 -->
#### Single controllers

| Option      | Type      | Default      | Description      |
| --- | --- | --- | --- |
| **name**  | `String` | *`${element_type}`* | Controller type. See the [list of controllers][#controllers]. |
| **PADS**  |  |  | Options for the `xypad`, `xpad`, `ypad` controllers |
| **minX**  | `Number` | `0` | Minimum X value (not applicable for the `ypad`) |
| **minY**  | `Number` | `0` | Minimum Y value (not applicable for the `xpad`) |
| **maxX**  | `Number` | *`${windowWidth}`* | Maximun X value (not applicable for the `ypad`) |
| **maxY**  | `Number` | *`${windowHeight}`* | Maximun Y value (not applicable for the `xpad`) |
| **INPUTS**  |  |  | Options for the `text`, `button`, `checkbox` controllers |
| **label**  | `String` | `'${Type}'` | Label for the `checkbox` and `button` elements |
| **value**  | `String` | `''` | Label for the `checkbox` and `button` elements |
| **readOnly**  | `Boolean` | `false` | For the `text` only |
| **disabled**  | `Boolean` | `false` | Disables the controler |


<!--
  /**
   * Adds multiple controllers
   * @params {String} type - controller type
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
   *     createControllers({
   *       types: ['button', 'text', 'checkbox']
   *     });
   *     createControllers({
   *       types: ['xypad', 'xpad', 'ypad'],
   *       x: 500 // will be applied to the `xypad` and `xpad`
   *       y: 500 // will be applied to the `xypad` and `ypad`
   *     });
   */
 -->
#### Multiple controllers

All the options for a single controller, plus:

| Option      | Type      | Default      | Description      |
| --- | --- | --- | --- |
| **n**  | `Number` | `2` | Number of controllers of the same type |
| **beforeCreate**  | `Function` | `null` | Function to be trigged right before an controller is created |
| **afterCreate**  | `Function` | `null` | Function to be trigged right after an controller is created |


## Themes

* `p5` (default)

* `hip`

* `blac-fire`

* `black-mono`



## Contribute

This project is in its early develop stage, so for now the best way to contribute is using and reporting errors and bugs via [issues][issues], also sending suggestions to daniloprates@gmail.com.




[p5ctrlMinJs]: https://raw.githubusercontent.com/daniloprates/p5-controller/master/dist/p5.controller.min.js
[issues]: https://github.com/daniloprates/p5-controller/issues
