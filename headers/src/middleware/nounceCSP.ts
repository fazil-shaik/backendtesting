// src/middleware/nonceCSP.ts
import { type Request, type Response, type NextFunction } from 'express';
import crypto from 'crypto';

export function nonceCSP(req: Request, res: Response, next: NextFunction) {
  // Generate a random nonce per request
  const nonce = crypto.randomBytes(16).toString('base64');

  // Attach nonce to res.locals so templates can use it
  res.locals.nonce = nonce;

  // Build the CSP header using the nonce
  const csp = [
    `default-src 'none'`,
    `script-src 'nonce-${nonce}' https://cdn.jsdelivr.net`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data:`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://api.myapp.com`,
    `frame-ancestors 'none'`,
    `base-uri 'none'`
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  next();
}
