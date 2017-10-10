var createSheet = require("../lib/create-sheet.js")
var loadImage = require("../lib/load-image.js")

module.exports = function(){
  return loadImage("/fish.png").then(function(img){
    var rows = 5
    var cols = 4
    var sheet = createSheet({img, rows, cols})
    return sheet
  })
}
