const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
let requestCount = 0;

// Request counter middleware
app.use((req, res, next) => {
  requestCount++;
  next();
});

// Serve OS files (.txt)
app.get('/os/:filename', (req, res, next) => {
  const filePath = path.join(__dirname, 'os', `${req.params.filename}.txt`);
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) return res.status(404).send('File not found');
    res.sendFile(filePath, (err) => {
      if (err) next(err);
    });
  });
}); 
app.get('/cn/:filename', (req, res, next) => {
  const baseName = req.params.filename;
  const CN_DIR = path.join(__dirname, 'cn');
  const CN_EXTS = ['.js', '.pkt', '.pcap'];

  for (const ext of CN_EXTS) {
    const actualFileName = baseName + ext;
    const fullPath = path.join(CN_DIR, actualFileName);

    if (fs.existsSync(fullPath)) {
      res.setHeader('Content-Type', 'application/octet-stream'); // Force download
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${actualFileName}"`
      );
      return res.sendFile(fullPath, (err) => {
        if (err) next(err);
      });
    }
  }

  res.status(404).send('File not found');
});


// Default route: show bitmapping.txt + request count
app.use((req, res, next) => {
  const infoFile = path.join(__dirname, 'bitmapping.txt');
  fs.readFile(infoFile, 'utf8', (err, data) => {
    if (err)
      return res.status(404).send(`Not Found\nTotal requests: ${requestCount}`);
    res.send(`${data}\n\nTotal requests: ${requestCount}`);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start server
const PORT = process.env.PORT || 9999;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
