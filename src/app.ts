import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from backend testing app!' });
});
app.get('/status', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/echo', express.json(), (req, res) => {
  res.json({ youSent: req.body });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend testing app is running on port ${PORT}`);
});

export default app;