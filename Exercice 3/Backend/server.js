const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const cors = require('cors');
const corsOptions = {
  origin: '*' ,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

app.post('/candidate', upload.single('file'), (req, res) => {
  const { firstName, lastName, email, description } = req.body;
  const file = req.file;

  const candidate = {
    firstName,
    lastName,
    email,
    description,
    file: file.filename,
  };

  const jsonData = JSON.stringify(candidate);
  const filePath = path.join(__dirname, 'uploads', `${Date.now()}-candidate.json`);

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing file');
    }

    console.log('Candidate data saved to JSON file:', filePath);
    return res.sendStatus(200);
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
