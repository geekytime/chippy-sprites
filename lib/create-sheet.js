module.exports = function(args={}){
  var img = args.img || new Image()
  var sheet = {
    cols: args.cols || 1,
    img,
    rows: args.rows || 1,
    width: img.width,
    height: img.height
  }
  sheet.frameWidth = sheet.width / sheet.cols
  sheet.frameHeight = sheet.height / sheet.rows
  sheet.frameCount = sheet.rows * sheet.cols

  sheet.frames = []
  for (var i=0; i<sheet.frameCount; i++){
    var frame = i % sheet.frameCount
    var row = Math.floor(frame / sheet.cols)
    var col = frame % sheet.cols

    var xOffset = col * -sheet.frameWidth
    var yOffset = row * -sheet.frameHeight
    sheet.frames.push({xOffset, yOffset})
  }
  return sheet
}
