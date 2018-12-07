self.importScripts("https://cdn.jsdelivr.net/gh/naptha/tesseract.js@1.0.10/dist/tesseract.js");

self.addEventListener('message', function(e) {
 Tesseract.recognize(e.data)
.then(function(result){
    console.log(result)
})

}, false);