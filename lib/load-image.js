module.exports = function(src){
  return new Promise(function(resolve, reject){
    var img = new Image()
    img.onload = function(){
      resolve(img)
    }
    img.onerror = function(){
      reject(new Error(`Unable to load image '${src}'`))
    }
    img.src = src
  })
}
