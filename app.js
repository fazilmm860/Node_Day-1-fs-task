const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000; // You can choose any port you prefer

app.use(express.json());

// Create endpoint to create a text file with current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString();
    const filename = `timeStamp.txt`;
    const content = timestamp;

    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, filename);
    console.log('Writing to filePath:', filePath);

    // Check if the 'files' directory exists, create it if not
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error creating file');
        } else {
            res.send('File created successfully');
        }
    });
});

// Create endpoint to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
    const folderPath = path.join(__dirname, 'files');

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving files');
        } else {
            res.json(files);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
