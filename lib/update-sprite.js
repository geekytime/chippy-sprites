var normalizeFrame = require("./normalize-frame.js")

module.exports = function(sprite){
  sprite.frame = sprite.frame + sprite.props.speed
  var frameData = normalizeFrame(sprite.frame, sprite.sheet.frameCount)
  sprite.frame = frameData.partialFrame

  var xSizeFactor = sprite.sheet.frameWidth / sprite.props.width
  var ySizeFactor = sprite.sheet.frameHeight / sprite.props.height

  var xSize = sprite.sheet.width / xSizeFactor
  var ySize = sprite.sheet.height / ySizeFactor
  sprite.el.style.backgroundSize = `${xSize}px ${ySize}px`

  var frameOffsets = sprite.sheet.frames[frameData.frame]
  var xOffset = frameOffsets.xOffset / xSizeFactor
  var yOffset = frameOffsets.yOffset / ySizeFactor
  sprite.el.style.backgroundPosition = `${xOffset}px ${yOffset}px`
}
