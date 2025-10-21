import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import status from 'express-status-monitor'
const app = express();

app.use(status());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
//   const stream = fs.createReadStream(join(__dirname, './assets/random.txt'), 'utf8');

//   res.setHeader('Content-Type', 'text/plain');

//   stream.pipe(res);

//   stream.on('error', (err) => {
//     console.error(err);
//     res.status(500).send('Error reading file');
//   });

    const stream = fs.createReadStream(join(__dirname, './assets/random.txt'), 'utf8');
    stream.on('data',(chunk)=>{
        res.write(chunk);
    })
    stream.on('end',()=>{
        res.end();
    })
    
    stream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Error reading file');
    });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
