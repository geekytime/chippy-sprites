module.exports = function(sheet, args={}){
  var width = parseSize(args.width)
  var height = parseSize(args.height)
  var speed = args.speed || 1
  var props = {
    backgroundColor: args.backgroundColor || "transparent",
    width: width || sheet.frameWidth,
    height: height || sheet.frameHeight,
    speed: parseFloat(speed, 10)
  }

  var el = document.createElement("div")
  el.style.backgroundColor = props.backgroundColor
  el.style.backgroundImage = `url(${sheet.img.src})`
  el.style.width = `${props.width}px`
  el.style.height = `${props.height}px`

  var sprite = {
    frame: 0,
    el,
    props,
    sheet
  }

  return sprite
}

var parseSize = function(size){
  var int = parseInt(size, 10)
  if (Number.isInteger(int)){
    return int
  }
  return undefined
}
