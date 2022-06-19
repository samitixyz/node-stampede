
//=============================================================================
// The NODETHINGS v1.0.0
//=============================================================================

const express = require('express')
const fileUpload = require('express-fileupload')
const path = require("path")


const filesPayloadExists = require('./middleware/filesPayloadExists')
const fileExtLimiter = require('./middleware/fileExtLimiter')
const fileSizeLimiter = require('./middleware/fileSizeLimiter')

const port = process.env.PORT || 3500;

const app = express()
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post('/upload', 
    fileUpload({createParentPath: true}),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files
        console.log(files)
        Object.keys(files).forEach(key => {
            console.log('KEY ===> ' + key)
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if(err) return res.status(500).json({ status: "error", message: error })
            })
        })
        return res.json({ status: 'success', message: Object.keys(files).toString()})
    }
)
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})