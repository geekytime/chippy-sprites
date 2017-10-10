var createSheet = require("../lib/create-sheet.js")
var loadFishSheet = require("./load-fish-sheet.js")
var test = require("tape")


test("createSheet - valid", function(t){
  loadFishSheet().then(function(sheet){
    t.equals(sheet.cols, 4, "cols")
    t.equals(sheet.rows, 5, "rows")
    t.equals(sheet.frameCount, 20, "frameCount")
    t.equals(sheet.frameWidth, 498, "frameWidth")
    t.equals(sheet.frameHeight, 327, "frameHeight")
    t.equals(sheet.height, 1635, "height")
    t.equals(sheet.width, 1992, "width")
    t.ok(sheet.img, "img exists")
    t.end()
  })
})

test("createSheet - empty", function(t){
  var sheet = createSheet()
  t.equals(sheet.img.src, "", "empty sheet")
  t.end()
})
