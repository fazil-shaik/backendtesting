// // npm i express express-rate-limit
// import express, { json } from 'express';
// import rateLimit from 'express-rate-limit';

// const app = express();

// const loginLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minutes
//   max: 5,                   // limit each IP to 5 requests per windowMs
//   message: { error: 'Too many login attempts from this IP, please try again later.' },
//   standardHeaders: true,    // Return RateLimit-* headers
//   legacyHeaders: false,
//   requestPropertyName: 'rateLimitInfo',


// });

// app.use(json());
// app.post('/login', loginLimiter, (req, res) => {
//   // login logic...
//   res.json({ ok: true });
// });

// app.listen(3000);



//token bucket algorithm
import express from 'express';
const app = express();

// User-based token bucket store
const buckets = {};

const RATE = 1;      // 1 token added per second
const CAPACITY = 5;  // Max 5 tokens per user

function refillTokens(bucket) {
  const now = Date.now();
  const elapsed = (now - bucket.lastRefill) / 1000; // seconds
  const newTokens = Math.floor(elapsed * RATE);
  bucket.tokens = Math.min(bucket.tokens + newTokens, CAPACITY);
  bucket.lastRefill = now;
}

app.use((req, res, next) => {
  const userId = req.ip; // using IP address as ID
  if (!buckets[userId]) {
    buckets[userId] = { tokens: CAPACITY, lastRefill: Date.now() };
  }

  const bucket = buckets[userId];
  refillTokens(bucket);

  if (bucket.tokens > 0) {
    bucket.tokens--;
    next(); // allow request
  } else {
    res.status(429).send('Too Many Requests. Try again later.');
  }
});

app.get('/', (req, res) => {
  res.send('Hello, you are within rate limit!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
