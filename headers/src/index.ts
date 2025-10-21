import express,{type Request ,type Response,type NextFunction} from 'express';
import helmet from 'helmet';
const app = express();
const PORT = process.env.PORT ?? 3000;

/**
 * 1) Use helmet with some selective options.
 *    - contentSecurityPolicy is disabled by default in Helmet v5+; enable and configure it explicitly.
 *    - frameguard controls X-Frame-Options.
 */
app.use(
  helmet({
    // Example: enable HSTS (strict-transport-security)
    // helmet() includes hsts by default but you can configure it:
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    // If you want to use CSP, configure it explicitly:
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "https:"],
        "script-src": ["'self'"], // tighten based on your needs
        // you can add more directives as required
      },
    },
    // other helmet options can be set here
  })
);

/**
 * 2) Add a custom middleware to set your own headers (global)
 *    Useful for app-specific headers or setting them in a particular way.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  // Example: prevent the app being embedded in other sites (double-check with helmet frameguard)
  res.setHeader('X-Frame-Options', 'DENY');

  // Example: set a Referrer-Policy
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');

  // Example: Permissions-Policy
  // e.g., disable geolocation, camera, microphone access from cross-origin frames
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Example: Custom header for your service
  res.setHeader('X-App-Name', 'MyAwesomeApp');

  next();
});

/**
 * 3) Route-specific header demonstration
 *    Sometimes you want to override or add headers only for a certain route.
 */
app.get('/public-file', (req: Request, res: Response) => {
  // Allow this route to be embedded in an iframe intentionally:
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://trusted.example.com'); // note: some browsers don't support ALLOW-FROM
  res.send('This page can be embedded by a trusted origin (if supported by the browser).');
});

/**
 * 4) Example API route that sets caching and security headers
 */
app.get('/api/data', (req: Request, res: Response) => {
  // Cache-control example for API responses
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  // CSP header on-the-fly (if you want to build per-response)
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.json({ ok: true, ts: Date.now() });
});

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Helmet + Custom Headers Example</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
