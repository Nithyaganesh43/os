const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/os/:f', (req, res) => {
  const p = path.join(__dirname, 'os', req.params.f + '.txt');
  fs.existsSync(p) ? res.sendFile(p) : res.status(404).send('Not Found');
});

app.get('/cn/:f', (req, res) => {
  const base = path.join(__dirname, 'cn', req.params.f);
  const exts = ['.pkt', '.js', '.pcap'];
  for (let ext of exts) {
    const f = base + ext;
    if (fs.existsSync(f)) return res.download(f);
  }
  res.status(404).send('Not Found');
});

app.use((req, res) => {
  const p = path.join(__dirname, 'bitmapping.txt');
  fs.existsSync(p) ? res.sendFile(p) : res.status(404).send('Not Found');
});

app.listen(process.env.PORT || 9999, '0.0.0.0', () => {
  console.log('server running at http://localhost:9999');
});
