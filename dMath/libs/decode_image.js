const { createCanvas, loadImage, cairoVersion } = require('canvas');
const webp=require('webp-converter');
const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');


exports.decodingMangaScript = () => {
    const canvas = createCanvas(1000, 2405)
    const ctx = canvas.getContext('2d')
    loadImage('./images/image_test.jpg').then((image) => {
        var sovleImage = [
            ["500.00", "962.00", "0.00", "0.00"],
            ["500.00", "481.00", "0.00", "481.00"],
            ["0.00", "1443.00", "0.00", "962.00"],
            ["0.00", "0.00", "0.00", "1443.00"],
            ["0.00", "481.00", "0.00", "1924.00"],
            ["500.00", "1924.00", "500.00", "0.00"],
            ["500.00", "0.00", "500.00", "481.00"],
            ["0.00", "1924.00", "500.00", "962.00"],
            ["0.00", "962.00", "500.00", "1443.00"],
            ["500.00", "1443.00", "500.00", "1924.00"]
        ];
        for (var i = 0; i < sovleImage.length; i++) {
            // ctx.drawImage(image, sovleImage[i][2], sovleImage[i][3], 500, 481, sovleImage[i][0], sovleImage[i][1], 500, 481);
            ctx.drawImage(image, sovleImage[i][2], sovleImage[i][3], 500, 294, sovleImage[i][0], sovleImage[i][1], 500, 294);

            // ctx.drawImage(image,sovleImage[i][2],sovleImage[i][3],500,333,sovleImage[i][0],sovleImage[i][1],500,333);
        }
        var base64Data = canvas.toDataURL().replace(/^data:image\/png;base64,/, "");
        require("fs").writeFile("./public/bot/out/out.png", base64Data, 'base64', function(err) {
            console.log(err);
        }).then((result) => {
            print(finished);
        });
    });
}

/*
* Using
*/
exports.decodingCanvas = async (sovleImage, imagePath, objDownload, filename) => {

    webp.grant_permission();

    //check filename
    var ext = path.extname(filename);
    console.log(`FILE NAME ==============================> ${ext}`);

    var canvasH = 100;
    const dimension =  await sizeOf(imagePath);
    canvasH = dimension.height;
    console.log(`Canvas Height: ${canvasH}`);

    // const canvas = createCanvas(1000, 1667);
    var canvas = createCanvas(1000, canvasH);
    const ctx = canvas.getContext('2d');
    var _tempImage = imagePath;
    var _dir = "./public/bot/out/";
    var result = "";

    if (!fs.existsSync(_dir)){
        fs.mkdirSync(_dir, { recursive: true });
    }

    console.log("=========================fff======================");
    console.log(filename);
    console.log(imagePath);
    console.log("file type: ");

    if(ext != '.jpg') {
        result = await webp.dwebp(imagePath, './public/bot/' + filename, "-o",logging="-v");
    }

    console.log("========================= result load img ======================");    
    var resultLoadImg = await loadImage('./public/bot/' + filename)
        .then()
        .catch( error => webp.dwebp(imagePath, './public/bot/' + filename, "-o",logging="-v"));

    console.log("=========================jjj======================");

    console.log("Loading Image..." + filename);
    // return loadImage('./public/bot/decode/' + filename).then( async (image) => {
    return loadImage('./public/bot/' + filename).then( async (image) => {

        console.log("creating new image");
        for (var i = 0; i < sovleImage.length; i++) {
            // ctx.drawImage(image,sovleImage[i][2],sovleImage[i][3],500,333,sovleImage[i][0],sovleImage[i][1],500,333);
            ctx.drawImage(
                image,
                sovleImage[i][objDownload["parameter"][1]],
                sovleImage[i][objDownload["parameter"][2]],
                objDownload["parameter"][3],
                objDownload["parameter"][4],
                sovleImage[i][objDownload["parameter"][5]],
                sovleImage[i][objDownload["parameter"][6]],
                objDownload["parameter"][7],
                objDownload["parameter"][8]
            );
        }

        ctx.font = "19px Times New Roman";
        ctx.fillStyle = "# FFC82C";
        ctx.textAlign = 'right';
        ctx.fillText ("[dMath]", dimension.width-20, dimension.height-20)

        var base64Data = canvas.toDataURL().replace(/^data:image\/png;base64,/, "");
        console.log("write file...");
        fs.writeFile(`${ _dir + filename }`, base64Data, 'base64', function(err) {
            console.log(err);
        });
 
        const finalImagePath =  _dir + filename;
        var _checker = await check(finalImagePath);
        console.log(`checker ${ _dir + filename }`);
        if(_checker) {
            console.log("finished!!!...");
        }
    });
}

async function check(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile(path, 'utf8', function(err, data) {
               if (err) {
                   check();
               }else{
                    console.log("Get the file...");
                    return resolve(true);
               }
            });
        }, 5000);
    });
}
