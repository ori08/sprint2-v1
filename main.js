var gCanvas;
var gCtx;
var gCurrShape = 'shape1';
var color;
var gStartPosx
var gStartPosy
var gShapeSize = 30;
var storedPicsUrl
var imageID = 1;
var lastIdx


if (!lastIdx) lastIdx = 0
else lastIdx = gEditedMem.line.length - 1

color = document.querySelector(".shapeColor").value


gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');





function init() {

    rendImg()
    setTimeout(render, 5)

}


function saveMeme(stored, loaded) {

    if (!loadFromStorage("imageUrl")) storedPicsUrl = []
    else storedPicsUrl = loadFromStorage("imageUrl")


    stored = gEditedMem.line
    saveToStorage("mem", stored)

    loaded = loadFromStorage("mem")
    storedMem.push(loaded)

    // if (!loadFromStorage("editedMem")) storedMem = []
    // else storedMem = loadFromStorage("editedMem")




    saveToStorage("editedMem", storedMem)
    var imageUrl = gCanvas.toDataURL("image/jpg");

    storedPicsUrl.push(imageUrl)
    saveToStorage("imageUrl", storedPicsUrl)
}



function onSetImg(ev) {

    imageID = ev
    clearCanvas()
    rendImg()

}

function clearCanvas() {

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gEditedMem.line.splice(0, gEditedMem.line.length)
    rendImg();
}


function switchLines() {

    if (lastIdx < gEditedMem.line.length - 1) {
        lastIdx = Math.abs(lastIdx + 1)
        console.log(lastIdx)
    }
    else lastIdx = 0

}


function moveDown() {

    gEditedMem.line[lastIdx].locationY += 50
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)
}

function moveUp() {
    gEditedMem.line[lastIdx].locationY -= 50
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)
}

function moveLeft() {

    gEditedMem.line[lastIdx].locationX -= 50
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)
}


function moveRight() {

    gEditedMem.line[lastIdx].locationX += 50
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)
}


function drawEmoji(ev) {

    text = ev

    var obj = {
        imageID: imageID,
        txt: text,
        size: 100,
        align: 'left',
        color: 'red',
        locationY: 150,
        locationX: 150,
    }


    gEditedMem.line.push(obj)
    refrashCanvas()
    rendImg()
    setTimeout(render, 500)
}

function fontChange() {
    gEditedMem.line[lastIdx].font = "Arial"
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)
}


function fontIncarseSize() {

    gEditedMem.line[lastIdx].size += 5
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)

}

function fontDecraseSize() {

    gEditedMem.line[lastIdx].size -= 5
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)

}

function changeColor(value) {

    gEditedMem.line[lastIdx].color = value
    refrashCanvas()
    rendImg()
    setTimeout(render, 5)
}


function remove() {

    gEditedMem.line.splice(lastIdx, 1);

    refrashCanvas()
    rendImg()
    setTimeout(render, 500)

}

function onSetSettings(ev) {
    ev.preventDefault()





    text = document.querySelector('[name=text]').value

    var obj = {
        imageID: imageID,
        txt: text,
        size: 100,
        font: "Impact",
        align: 'left',
        color: 'red',
        locationY: 60,
        locationX: 0
    }

    // save lines to obj


    gEditedMem.line.push(obj)
    // console.log(gEditedMem)

    //render
    refrashCanvas()
    rendImg()
    setTimeout(render, 500)
    document.querySelector("input").value = ""

}


function rendImg() {
    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize;
    image.src = `img/${imageID}.jpg`;

}

function render() {

    for (i = 0; i < gEditedMem.line.length; i++) {
        var txt = gEditedMem.line[i].txt
        var locationY = gEditedMem.line[i].locationY
        var locationX = gEditedMem.line[i].locationX
        var fontSize = gEditedMem.line[i].size
        var memColor = gEditedMem.line[i].color
        var memFont = gEditedMem.line[i].font
        // if (i === 0) 
        addLine(locationY, locationX, txt, fontSize, memFont, memColor)
        // else if (i === 1) addLine(gCanvas.height, txt)
        // else if (i === 2) addLine(gCanvas.height / 2, txt)
        // else addLine(60, txt)

    }

}


function addLine(y, x, txt, fontSize, font, memColor) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = memColor;

    gCtx.font = `${fontSize}px ${font}`

    var posX = x
    var posy = y

    gCtx.fillText(txt, posX, posy);
    gCtx.strokeText(txt, posX, posy);
    // drawRect(y, color)

}

function drawRect(y, color) {
    gCtx.beginPath();
    gCtx.rect(0, y, gCanvas.width, -60);
    gCtx.strokeStyle = color;
    gCtx.stroke();
    gCtx.save()
}

function refrashCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gShapeSize = 30;

}

function draw(ev) {

    var x = ev.offsetX
    var y = ev.offsetY


    drawRec(150, 50)
}

function renderImg(img) {
    //Draw the img on the canvas

    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawImageActualSize() {
    gCanvas.width = this.naturalWidth;
    gCanvas.height = this.naturalHeight;
    gCtx.drawImage(this, 0, 0);
    gCtx.drawImage(this, 0, 0, this.width, this.height);
}



function selectedIMG(i) {

    imageID = i
    clearCanvas()
    rendImg()

    document.querySelector(".main-container-gllary").style.display = "none"
    document.querySelector(".main-container-editor").style.display = "grid"

}

function goToGalleryPage() {
    window.location.href = "index.html"
    document.querySelector(".main-container-gllary").style.display = "flex"
    document.querySelector(".main-container-editor").style.display = "none"


}
































function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");// Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        //Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        //Create a link that on click will make a post in facebook with the image we uploaded
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    //Send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    //Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    //Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })   //Gets the result and extract the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}