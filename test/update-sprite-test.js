var createSprite = require("../lib/create-sprite.js")
var loadFishSheet = require("./load-fish-sheet.js")
var test = require("tape")
var updateSprite = require("../lib/update-sprite.js")

test("updateSprite - default speed", function(t){
  loadFishSheet().then(function(sheet){
    var sprite = createSprite(sheet)
    t.equal(sprite.el.style.backgroundPosition, "", "on first frame")
    updateSprite(sprite)
    t.equal(sprite.el.style.backgroundPosition, "-498px 0px", "on second frame")
    updateSprite(sprite)
    t.equal(sprite.el.style.backgroundPosition, "-996px 0px", "on third frame")
    t.end()
  })
})

test("updateSprite - fast speed", function(t){
  loadFishSheet().then(function(sheet){
    var sprite = createSprite(sheet, {speed: 6})
    t.equal(sprite.el.style.backgroundPosition, "", "on first frame")
    updateSprite(sprite)
    t.equal(sprite.el.style.backgroundPosition, "-996px -327px", "on sixth frame")
    updateSprite(sprite)
    t.equal(sprite.el.style.backgroundPosition, "0px -981px", "on twelvth frame")
    t.end()
  })
})

test("updateSprite - slow speed", function(t){
  loadFishSheet().then(function(sheet){
    var sprite = createSprite(sheet, {speed: .1})
    t.equal(sprite.el.style.backgroundPosition, "", "on first frame")
    for (var i=0; i<11; i++){
      updateSprite(sprite)
    }
    t.equal(sprite.el.style.backgroundPosition, "-498px 0px", "on second frame")
    t.end()
  })
})

test("updateSprite - reverse speed", function(t){
  loadFishSheet().then(function(sheet){
    var sprite = createSprite(sheet, {speed: -1})
    t.equal(sprite.el.style.backgroundPosition, "", "on first frame")
    updateSprite(sprite)
    t.equal(sprite.el.style.backgroundPosition, "-1494px -1308px", "on last frame")
    t.end()
  })
})
