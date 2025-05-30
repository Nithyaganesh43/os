const e = require('express')(),
  p = require('path');
e.get('/:f', (q, s) => s.sendFile(p.join(__dirname, q.params.f + '.txt')));
e.listen(process.env.PORT || 3000);
    