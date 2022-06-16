var memsFromStoarge = loadFromStorage("editedMem")
var urlFromStoarge = loadFromStorage("imageUrl")
// var imageUrlTab = urlFromStoarge[i][0]

console.log(urlFromStoarge[0])
var strHtml


console.log(memsFromStoarge)

console.log(memsFromStoarge[1][0].imageID)
var strHtml = ""




for (i = 0; i < urlFromStoarge.length; i++) {

    strHtml += `<img class="resize3"  src=${urlFromStoarge[i]}>`

}

document.querySelector(".pics-container").innerHTML = strHtml





function downloadImg(elLink) {
    // var imgContent = gElCanvas.toDataURL('image/jpeg')
    var imgContent = gCanvas.toDataURL('image/jpeg')
    console.log(imgContent)
    elLink.href = imgContent

}






// function renderObj(i) {





// }

