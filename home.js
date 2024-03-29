const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Middleware for handling multipart/form-data, which is primarily used for uploading files
const path = require('path');

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Generate a unique filename for the uploaded file
  }
});

const upload = multer({ storage: storage });


// POST endpoint to receive data from the frontend
app.post('/home_data', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully.');
  
  const { inputValue, inputPara, join, learn, homeimg } = req.body;

  // Here, you can do whatever you want with the received data, like storing it in a database
  console.log('Received data:');
  console.log('Input Value:', inputValue);
  console.log('Input Para:', inputPara);
  console.log('Join:', join);
  console.log('Learn:', learn);
  console.log('Home Image:', homeimg);

  // Send a response back to the frontend
  res.send('Data received successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
