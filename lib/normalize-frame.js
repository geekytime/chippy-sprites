module.exports = function(currentFrame, frameCount){
  if (currentFrame < 0){
    return normalizeNegative(currentFrame, frameCount)
  }
  return normalizePositive(currentFrame, frameCount)
}

var normalizePositive = function(currentFrame, frameCount){
  return {
    frame: Math.floor(currentFrame % frameCount),
    partialFrame: currentFrame % frameCount
  }
}

var normalizeNegative = function(currentFrame, frameCount){
  var adjusted = frameCount + currentFrame
  return {
    frame: Math.floor(adjusted % frameCount),
    partialFrame: adjusted % frameCount
  }
}
