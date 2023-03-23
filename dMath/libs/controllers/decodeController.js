
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const unpacker = require("unpacker")
const axios = require('axios'); 
const fs = require('fs');
const { decodingCanvas } = require("../decode_image");
const { writer } = require("repl");
const { resolve } = require("path");
const { rejects } = require("assert");

// Display all logs
exports.log_list = (req, res) => {
    res.json({"status": "connected"});
};

exports.decoding = (req, res) => {
    console.log("post decoding...");
    var reqBody = req.body;
    var unPackedCode = unpacker.unpack(reqBody);
    var regExp= /(?<=sovleImage=)(\[\[.*]];)/;
    var matches = regExp.exec(unPackedCode);
    console.log(matches[0]);

    return res.json({
        "message": "successfully",
        "url": matches[0]
    });
};

/*
* POST REQUEST
*/
exports.download = async (req, res) => {
    // Helper function to get a random item from an array 
    const sample = array => array[Math.floor(Math.random() * array.length)]; 
    const headers = [ 
            { 
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
                'Accept-Encoding': 'gzip, deflate, br', 
                'Accept-Language': 'en-US,en;q=0.9', 
                'Sec-Ch-Ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
                'Sec-Ch-Ua-Mobile': '?0', 
                'Sec-Fetch-Dest': 'document', 
                'Sec-Fetch-Mode': 'navigate', 
                'Sec-Fetch-Site': 'none', 
                'Sec-Fetch-User': '?1', 
                'Upgrade-Insecure-Requests': '1', 
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
            }, 
            { 
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 
                'Accept-Encoding': 'gzip, deflate, br', 
                'Accept-Language': 'en-US,en;q=0.5', 
                'Sec-Fetch-Dest': 'document', 
                'Sec-Fetch-Mode': 'navigate', 
                'Sec-Fetch-Site': 'none', 
                'Sec-Fetch-User': '?1', 
                'Upgrade-Insecure-Requests': '1', 
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0', 
            }, 
    ]; 
    const config = { 
        headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 
        }, 
    }; 

    objDownload = {};
    console.log('Downloading...');
    const resBody = req.body;
    const urlBody = resBody.url;
    const scriptBody = resBody.script;

    //before unpacked
    let nativeScript = `<script>eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('8 a=q.l("k");8 e=a.o("n");8 9=m h;9.j=f(){e.g(9,0,0);8 6=[["0.4","0.4","0.4","0.4"],["5.4","7.4","0.4","7.4"],["5.4","0.4","0.4","d.4"],["5.4","c.4","0.4","c.4"],["0.4","c.4","0.4","b.4"],["0.4","7.4","5.4","0.4"],["5.4","b.4","5.4","7.4"],["5.4","d.4","5.4","d.4"],["0.4","d.4","5.4","c.4"],["0.4","b.4","5.4","b.4"]];r(8 i=0;i<6.s;i++){e.g(9,6[i][2],6[i][3],5,7,6[i][0],6[i][1],5,7)}};9.u=a.v("w-x");a.y=f(){t p}',35,35,'||||00|500|sovleImage|333|var|BDQIXimage|BDQIXcanvasRender|1332|999|666|BDQIXctx|function|drawImage|Image||onload|imageBDQIX2|getElementById|new|2d|getContext|false|document|for|length|return|src|getAttribute|data|url|oncontextmenu'.split('|'),0,{}))</script>`;
    let regex_zero = /<script>\s*(.+?)\s*\<\/script>/;
    let matches_nativescript = regex_zero.exec(nativeScript);
    const scriptBodyFiltered = matches_nativescript[1];

    //script
    var unPackedCode = unpacker.unpack(scriptBody);
    let regex = /for\s*\([^;]*?;[^;]*?;[^)]*?\)({)(.*)(}};)/;
    let machy = regex.exec(unPackedCode);
    console.log(machy[0]);
    console.log("========> matchy: ");
    console.log(machy);
    var splitMachy = machy[0].split(',');
    
    let parameterDecode = [];
    let numberRegex = /\d+/;
    for(var i=0; i<splitMachy.length; i++){
        let number = parseInt(numberRegex.exec(splitMachy[i]));
        console.log(number);
        parameterDecode.push(number);
    }

    //5 9

    console.log(`parameterDecode: ${parameterDecode}`);
    console.log(`parameterDecode: ${parameterDecode[4]}`);

    objDownload["parameter"] = parameterDecode;

    console.log(objDownload["parameter"]);

    //regExp Loop Matrix
    var regex_first = /\.drawImage\(.*sovleImage\[i]\[\d*],sovleImage\[i]\[\d*],\d*,\d*,sovleImage\[i]\[\d*],sovleImage\[i]\[\d*],\d*,\d*\)/i;
    var matches_first = regex_first.exec(unPackedCode);
    console.log("========> matches_first");
    // console.log(matches_first);
    // var drawImage = matches_first[0];

    //regExp Matrix
    var regExp = /(?<=sovleImage=)(\[\[.*]];)/;
    var matches = regExp.exec(unPackedCode);
    console.log("sovle image");
    console.log(matches[0]);
    var sovleImage = matches[0];
    var arr = sovleImage.split(",");

    //head
    arr[0] = arr[0].replace("[[", "");
    //tail
    arr[arr.length-1] = arr[arr.length-1].replace("]]", "");
    var newMactx  = [];
    let row = [];
    var regMactx = /\d*\.?\d\d/;
   
    //create new matrix
    for(var i=0; i < 10; i++) {
        var row_offset = i * 4;
        for( var j = row_offset; j < row_offset + 4 ; j++ ){
            let matches = regMactx.exec(arr[j]);
            let sovImg = matches[0];
            let fSoveImg = parseFloat(sovImg);
            row.push(fSoveImg);
        }
        newMactx.push(row);
        row=[];
    }

    console.log(newMactx);

    //url
    var host = req.get('host');
    var dir = './public/bot/';

    console.log(`URL BODY: ${urlBody}`);
    const url = urlBody;

    var filename = url.substring(url.lastIndexOf('/')+1);
    var encodedImagPath = `${ dir + filename }` || "";
    console.log("Encoding Image: " + encodedImagPath);

    var saveDownloadImage = await axios
        .get(url, {
            responseType: "stream",
            // headers: sample(headers),
        } )  
        .then(response => {  
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            return response.data.pipe(fs.createWriteStream(`${ dir + filename }`));
        })
        .then( async (result) =>{
            var _checker = await check(encodedImagPath);
            console.log(`checker ====> ${_checker}`);
            if(_checker) {
                console.log(`FileName ====> ${filename}`);
                await decodingCanvas(newMactx, encodedImagPath, objDownload, filename);
            }
            return result;
        })
        .catch(error => {  
            console.log(error);  
        })  
        .finally(() => {
            res.json({
                "message": "successfully",
                "filename": filename,
            });
            console.log('Decoding Completed');
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