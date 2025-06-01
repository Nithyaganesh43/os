const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const CN_DIR = path.join(__dirname, 'cn');
const OS_DIR = path.join(__dirname, 'os');
const CN_EXTS = ['.js', '.pkt', '.pcap'];
let requestCount = 0;

app.use((req, res, next) => {
  let ua = req.headers['user-agent'] || '';
  if (
    (req.method === 'GET' || !ua.includes('Mozilla')) &&
    req.path !== '/favicon.ico'
  )
    requestCount++;
  next();
});

// Serve OS .txt files (displayed in terminal)
app.get('/os/:filename', (req, res) => {
  const file = path.join(OS_DIR, `${req.params.filename}.txt`);
  fs.access(file, fs.constants.R_OK, (err) => {
    if (err) return res.status(404).send('Not found');
    res.sendFile(file);
  });
});

// Serve CN files with correct extension for curl
app.get('/cn/:filename', (req, res) => {
  const name = req.params.filename;
  for (const ext of CN_EXTS) {
    const full = path.join(CN_DIR, name + ext);
    if (fs.existsSync(full)) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${name + ext}"`
      );
      return res.sendFile(full);
    }
  }
  res.status(404).send('Not found');
});

app.use((req, res, next) => {
  const infoFile = path.join(__dirname, 'bitmapping.txt');
  fs.readFile(infoFile, 'utf8', (err, data) => {
    if (err)
      return res.status(404).send(`Not Found\nTotal requests: ${requestCount}`);

    res.setHeader('Content-Type', 'text/plain');
    res.send(data + `\n\nTotal requests: ${requestCount}`);
  });
});


// Error handler
app.use((err, req, res, next) => {
  res.status(500).send('Server error');
});

// Start server
const PORT = process.env.PORT || 9999;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running at http://localhost:${PORT}`);
});
