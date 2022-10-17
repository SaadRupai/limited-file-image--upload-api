let express = require('express');
let multer = require('multer');

app = express();

let storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads');
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callBack) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            callBack(null, true);
        } else {
            callBack(null, false);
            return callBack(new Error('Only .png and .jpg image format allowed!'));
        }
    }
}).single('myFile');



app.post('/file', (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            return res.status(400).send({ message: error.message });
        }
        // const files = req.files;
        // res.json(files);
        res.end('file upload successful!');
    });
});


app.listen(8000, () => {
    console.log("server connection successful!");
});