var sprites = require("../lib/sprites.js")
require("./demo.less")

var template = `
  <div class="params">
    <h1>This is a simple demo of chippy-sprites. For more info, check out the <a href="https://github.com/geekytime/chippy-sprites/blob/master/README.md">README</a>.</h1>
    <div>
      <label for="src">Sprite Sheet URL (You can paste image urls here for online images, too.)</label>
      <input id="src" value="/run.png" />
    </div>
    <div>
      <label for="rows">Rows</label>
      <input id="rows" type="number" value="4" />
    </div>
    <div>
      <label for="cols">Cols</label>
      <input id="cols" type="number" value="4" />
    </div>
    <div>
      <label for="width">Width</label>
      <input id="width" value="auto" />
    </div>
    <div>
      <label for="height">Height</label>
      <input id="height" value="auto" />
    </div>
    <div>
      <label for="speed">Speed</label>
      <input id="speed" type="number" min="-3" max="3" step=".025" value="0.35">
    </div>
  </div>
  <div id="target"></div>
`

var el = document.createElement("div")
el.innerHTML = template
document.body.appendChild(el)

var sprite

var loadSheet = function(){
  var src = document.querySelector("#src").value
  var rows = document.querySelector("#rows").value
  var cols = document.querySelector("#cols").value
  var width = document.querySelector("#width").value
  var height = document.querySelector("#height").value
  var speed = document.querySelector("#speed").value

  sprites.loadImage(src).then(function(img){
    var sheet = sprites.createSheet({img, rows, cols})
    sprite = sprites.createSprite(sheet, {speed, width, height})

    var target = document.querySelector("#target")
    target.innerHTML = ""
    target.appendChild(sprite.el)
  })
}

var update = function(){
  if (sprite){
    sprites.updateSprite(sprite)
  }
  requestAnimationFrame(update)
}
requestAnimationFrame(update)

document.addEventListener("input", loadSheet)

loadSheet()
