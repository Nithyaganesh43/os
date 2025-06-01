const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
let count = 0;

app.use((req, res, next) => {
  count++;
  next();
});

app.get('/os/:f', (req, res, next) => {
  const p = path.join(__dirname, 'os', req.params.f + '.txt');
  fs.access(p, fs.constants.R_OK, (err) => {
    if (err) return res.status(404).send('Not Found');
    res.sendFile(p, (err2) => {
      if (err2) next(err2);
    });
  });
});

app.get('/cn/:f', (req, res, next) => {
  const base = path.join(__dirname, 'cn', req.params.f);
  const exts = ['.pkt', '.js', '.pcap'];
  let i = 0;
  function check() {
    if (i === exts.length) return res.status(404).send('Not Found');
    const f = base + exts[i++];
    fs.access(f, fs.constants.R_OK, (err) => {
      if (!err)
        return res.download(f, (err2) => {
          if (err2) next(err2);
        });
      check();
    });
  }
  check();
});

app.use((req, res, next) => {
  const p = path.join(__dirname, 'bitmapping.txt');
  fs.readFile(p, 'utf8', (err, data) => {
    if (err) return res.status(404).send('Not Found\nTotal requests: ' + count);
    res.send(data + '\nTotal requests: ' + count);
  });
});

app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

app.listen(process.env.PORT || 9999, '0.0.0.0', () =>
  console.log('server running at http://localhost:9999')
);
