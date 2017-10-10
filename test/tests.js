var tape = require("tape")

document.body.style.fontFamily = "monospace"

tape.createStream().on("data", function(data){
  //eslint-disable-next-line no-console
  console.log(data)
  var p = document.createElement("p")
  p.style.margin = 0
  p.innerHTML = `${data}`
  document.body.appendChild(p)

  if (data.startsWith("not ok") || data.startsWith("# not ok")){
    document.body.style.backgroundColor = "#E57373"
  }

  fetch("/tap", {
    headers: {
      "Accept": "text/plain",
      "Content-Type": "text/plain"
    },
    method: "post",
    body: data
  })
})

tape.onFinish(function(){
  if (window.location.search.includes("exitOnComplete=true")){
    fetch("/done", {
      method: "post",
      body: tape.getHarness()._exitCode
    }).then(function(){
      window.close()
    })
  }
})

require("./create-sheet-test.js")
require("./create-sprite-test.js")
require("./load-image-test.js")
require("./normalize-frame-test.js")
require("./update-sprite-test.js")
