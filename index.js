const e = require('express')(),
  p = require('path'),
  fs = require('fs');
e.get('/:f', (q, s) => {
  try {
    let f = p.join(__dirname, q.params.f + '.txt');
    fs.access(f, fs.constants.F_OK, (err) =>
      err ? s.status(404).send('Not Found') : s.sendFile(f)
    );
  } catch (x) {
    s.status(500).send('Server Error');
  }
});
e.listen(process.env.PORT || 3000);
