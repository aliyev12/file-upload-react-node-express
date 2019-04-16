const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 6000;

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error('ERRORCITO ==>  ',err);
            err.poopoo = 'poopoo';
            return res.status(501).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));