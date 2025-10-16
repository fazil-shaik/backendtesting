import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/data',(req,res)=>{
    var data = req.body;
    console.log(data);
    res.send('POST request to the homepage');
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});