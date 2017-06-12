self.importScripts("https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js");

self.addEventListener('message', function(e) {
 Tesseract.recognize(e.data)
.then(function(result){
    console.log(result)
})

}, false);