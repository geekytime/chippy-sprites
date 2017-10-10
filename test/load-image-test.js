var test = require("tape")
var loadImage = require("../lib/load-image.js")

test("loads an image", function(t){
  loadImage("/fish.png").then(function(img){
    t.ok(img, "img exists")
    t.equal(img.width, 1992, "img has correct width")
    t.ok(true)
    t.end()
  })
})

test("rejects invalid images", function(t){
  loadImage("/bad-url.foo").catch(function(error){
    t.ok(error.message.includes("Unable to load"))
    t.end()
  })
})
