var createSprite = require("../lib/create-sprite.js")
var loadFishSheet = require("./load-fish-sheet.js")
var test = require("tape")

test("createSprite - default props", function(t){
  loadFishSheet().then(function(sheet){
    var sprite = createSprite(sheet)
    t.equal(sprite.el.style.backgroundColor, "transparent", "backgroundColor")
    t.equal(sprite.el.style.backgroundImage, "url(\"http://localhost:4444/fish.png\")", "backgroundImage")
    t.equal(sprite.el.style.width, "498px", "width")
    t.equal(sprite.el.style.height, "327px", "height")
    t.equal(sprite.props.speed, 1, "speed")
    t.end()
  })
})

test("createSprite - custom props", function(t){
  loadFishSheet().then(function(sheet){
    var props = {
      backgroundColor: "pink",
      width: 1000,
      height: 660,
      speed: .3
    }
    var sprite = createSprite(sheet, props)
    t.equal(sprite.el.style.backgroundColor, "pink", "backgroundColor")
    t.equal(sprite.el.style.backgroundImage, "url(\"http://localhost:4444/fish.png\")", "backgroundImage")
    t.equal(sprite.el.style.width, "1000px", "width")
    t.equal(sprite.el.style.height, "660px", "height")
    t.equal(sprite.props.speed, .3, "speed")
    t.end()
  })
})
