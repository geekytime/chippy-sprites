# chippy-sprites :chipmunk:

![ci](https://travis-ci.org/geekytime/chippy-sprites.svg?branch=master)

## Philosophy

A lot of game frameworks are very heavy-weight and rigid. chippy-sprites is an attempt to build a basic animated sprite that could be used in HTML-based games that can be used without a heavy framework, and can be easily integrated into any game or app.

chippy-sprites also provides clean separation of concerns by organizing code using simple functions instead of classes. This makes the logic more reusable. If you want to load images using some other image loader, you can. If you want to create your own custom format for parsing sprite sheets or atlases, you can!

Right now chippy-sprites only works with sprite sheets that have fixed-sized frames.

## Demo

You can load a demo sprite, or try out your own sprites, using this simple [interactive demo](https://geekytime.github.io/chippy-sprites).

You can also view the [code for the demo](https://github.com/geekytime/chippy-sprites/blob/master/demo/).

## Example

Here's an annotated example using plain javascript.

```javascript
import sprites from "chippy-sprites"

// First we need to load an image, if we don't already have one.
sprites.loadImage("/my-img.png").then(function(img){
  //Count how many rows and cols are in your sprite sheet.
  var rows = 3
  var cols = 3
  //Create our sprite sheet object, which handles all of the math of dividing
  //up the frames.
  var sheet = sprites.createSheet({img, rows, cols})

  //The speed tells chippy how many sprite frames to advance per each call to update.
  //.3 means it will take 3-4 update calls to advance a frame.
  var speed = .3
  //This sets the width and height we want the animated sprite to appear.
  //chippy will scale the sprite for us.
  var width = 100
  var height = 100
  //Create a sprite object from the given sheet and props.
  var sprite = sprites.createSprite(sheet, {speed, width, height})

  //Append the sprite element anywhere you'd like in the DOM.
  var target = document.querySelector("#target")
  target.innerHTML = ""  
  target.appendChild(sprite.el)

  //A naive "game loop" using `requestAnimationFrame` to update the sprite.
  //Each call to `updateSprite` advances the frame based on the `speed` prop.
  var update = function(){
    sprites.updateSprite(sprite)
    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
})
```

Or using Jquery and [browser-game-loop](https://github.com/cstuncsik/browser-game-loop).

```javascript
import $ from "jquery"
import sprites from "chippy-sprites"
import createGameLoop from "browser-game-loop"

sprites.loadImage("/my-img.png").then(function(img){
  var sheet = sprites.createSheet({img, rows: 4, cols: 5})
  var sprite = sprites.createSprite(sheet)
  $("#target").empty().append(sprite.el)

  var render = function(){
    sprites.updateSprite(sprite)
  }
  var loop = createGameLoop({ render })
  loop.start()
})
```

## API
```
loadImage(src: url): Promise<Image>
```
Pass in an image url, get back a promise for a ready-to-use Image element. The promise will resolve when the image is fully loaded.

```
createSheet(props: object): object
```
| Property | Type | Description |
|----------|------|-------------|
| img      | Image element | An Image element with the image already loaded |
| rows     | int  | The number of rows in the sprite sheet |
| cols     | int  | The number of columns in the sprite sheet |

All of these properties are required.

Returns a simple object with the sheet width and height, frame sizes, frame count, etc.

Example:

```javascript
{
  cols: 4,
  frameCount: 16,
  frameHeight: 733,
  frameWidth: 732,
  height: 2932,
  img: [Image],
  rows: 4,
  width: 2928
}
```

```
createSprite(sheet: sheet object, props: object): object
```
Takes a chippy sheet and some properties, and returns a sprite object that includes a DOM element where the sprite will render. You can place the element anywhere in your page.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| backgroundColor      | Any CSS color | Background color for the sprite, if the image has any transparency | "transparent"
| width     | Number or 'auto' | The width (in px) that the sprite will render | 'auto'
| height    | Number or 'auto' | The height (in px) that the sprite will render | 'auto'
| speed    | Number  | The number of frames to advance per each call to `updateSprite` | 1

All of these properties are optional.

### About width and height

The width and height parameters can be used to scale your sprite to render at a different size. If you use the default value of `"auto"`, your sprite will render at the same size as a single frame of the sheet.

### About speed

The speed property is used to slow down or speed up the rate of animation. By default, the speed is `1`, and every call to `updateSprite` will advance your sprite by one frame. If your game loop renders at 60 frames-per-second, your sprite frames will advance at 60 frames-per-second.

For animations with fewer frames, you will probably want to slow down the speed to a value less than `1`. For example, if your game loop renders at 60 frames-per-second, and your set your sprite's speed to `.1`, your animation will advance one frame for every 10 calls to `updateSprite`, which means your animation will render at 6 frames-per-second.

```
normalizeFrame(currentFrame: Number, frameCount: int): frameData: object
```

This function is used internally by `updateSprite` to round partial frames, overflow frames, and negative frames (when animating backwards) to actual frame indices. It returns a frameData object with both an integer animation frame and a normalized copy of the partial value that was passed in. The partial frame is used to properly wrap values around the end of the actual frames (forward or backward), while still maintaining which partial frame we are on.

For example:

```javascript
> normalizeFrame(1.5, 12)
{
  frame: 1,
  partialFrame: 1.5
}
```
