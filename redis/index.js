import redis from 'redis';
import express from 'express';

const app = express();
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

app.get('/set/:key/:value', (req, res) => {
    const { key, value } = req.params;
    client.set(key, value, (err) => {
        if (err) {
            return res.status(500).send('Error setting value in Redis');
        }
        res.send(`Value set for key: ${key}`);
    });
});

app.get('/get/:key', (req, res) => {
    const { key } = req.params;
    client.get(key, (err, value) => {
        if (err) {
            return res.status(500).send('Error getting value from Redis');
        }
        if (value === null) {
            return res.status(404).send('Key not found');
        }
        res.send(`Value for key ${key}: ${value}`);
    });
    console.log(`GET request for key: ${key}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
client.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.error('Could not connect to Redis:', err);
}); 