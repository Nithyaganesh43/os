const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const CN_DIR = path.join(__dirname, 'cn');
const OS_DIR = path.join(__dirname, 'os');

const CN_EXTS = ['.js', '.pkt', '.pcap', '.java', '.class'];


let  
  home = 0,
  cn = 0,
  os = 0;
 

app.get('/os/:filename', (req, res) => {
  os++;
  const file = path.join(OS_DIR, `${req.params.filename}.txt`);
  fs.access(file, fs.constants.R_OK, (err) => {
    if (err) return res.status(404).send('Not found');
    res.sendFile(file);
  });
});

app.get('/cn/:filename', (req, res) => {
  cn++;
  const name = req.params.filename;

  // If user provides full filename (with .java/.class), serve it directly
  const direct = path.join(CN_DIR, name);
  if (fs.existsSync(direct)) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    return res.sendFile(direct);
  }

  // Otherwise, try with known extensions
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
  if (req.path === '/' && req.path !== '/favicon.ico') home++;
  const infoFile = path.join(__dirname, 'bitmapping.txt');
  fs.readFile(infoFile, 'utf8', (err, data) => {
    if (err)
      return res
        .status(404)
        .send(
          `Not Found\nTotal requests: ${total}\nHome : ${home}\nCN : ${cn}\nOS : ${os}`
        );
    res.setHeader('Content-Type', 'text/plain');
    res.send(
      data +
        `\n\nTotal requests: ${home + cn + os}\nHome : ${home}\nCN : ${cn}\nOS : ${os}`
    );
  });
});

app.use((err, req, res, next) => {
  res.status(500).send('Server error');
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running at http://localhost:${PORT}`);
});
