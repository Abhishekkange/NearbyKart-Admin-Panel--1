const express = require('express');
const app = express();
const AttributesRouter = require('./router/AttributeRouters');
const connectToMongoDb = require('./db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const PORT = 5000;

app.use(express.json());

connectToMongoDb();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.post('/api/upload', upload.single('image'), (req, res) => {
    const fileName = req.file.filename;
    const filePath = `http://localhost:5000/uploads/${fileName}`;
    res.send(filePath);
});

app.use(cors({
    origin: 'http://localhost:5500'
}));



//routes
app.use('/',AttributesRouter);


app.listen(PORT,()=>{

    console.log("Server started at PORT ${PORT}");

});

