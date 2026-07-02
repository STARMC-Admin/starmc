# STARMC - Production Launch Checklist (`changes_left.md`)

This document outlines the remaining security hardening, reliability, and maintenance tasks required before deploying the **STARMC** site live in a production environment. 

---

## 🔴 Priority 1: Critical Security Fixes

### 1. Protect or Disable Database Seed Endpoint
Currently, the `/api/seed` endpoint is public and takes no authentication. Anyone who accesses it will trigger a database reset, wiping all active user records.

*   **File:** `server/routes/seed.js`
*   **Fix:** Add a check to block the seed route in production unless a secure key header matches, or disable it in production entirely.
*   **Instruction:** Update the top of the route handler to check the environment:
    ```javascript
    router.get('/', async (req, res, next) => {
      // Protect from unauthorized wipes in production
      if (process.env.NODE_ENV === 'production') {
        const seedAdminKey = process.env.SEED_ADMIN_KEY;
        const clientKey = req.headers['x-seed-key'];
        
        if (!seedAdminKey || clientKey !== seedAdminKey) {
          return res.status(403).json({ error: 'Database seeding operations are restricted in production.' });
        }
      }
      // ... database cleaning logic continues
    ```

### 2. Lock Down CORS Origins
The server currently uses `origin: true`, permitting requests from any origin with credentials. In production, this should be locked down to prevent potential Cross-Origin vulnerabilities.

*   **File:** `server/index.js`
*   **Fix:** Explicitly define allowed origins based on the environment.
*   **Instruction:** Update the middleware configuration block:
    ```javascript
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://starmc-ctwk.onrender.com'] // Replace with your frontend domain
      : ['http://localhost:3000', 'http://localhost:3001'];

    app.use(cors({
      origin: allowedOrigins,
      credentials: true
    }));
    ```

---

## 🟡 Priority 2: Security & Reliability Hardening

### 3. Implement Auth Rate Limiting
To prevent brute-force attacks on signin and registration routes, apply rate limiting middleware.

*   **File:** `server/index.js` or `server/routes/auth.js`
*   **Fix:** Install and use `express-rate-limit`.
*   **Instruction:** 
    1. Run `npm install express-rate-limit --save` in the `server` directory.
    2. Register the rate limiter middleware on `/api/auth` endpoints:
    ```javascript
    const rateLimit = require('express-rate-limit');

    const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 15, // limit each IP to 15 login/register requests per window
      message: { error: 'Too many authentication attempts, please try again in 15 minutes.' }
    });

    app.use('/api/auth', authLimiter);
    ```

### 4. Mask Production Error Stack Traces
The global error handler leaks raw database errors and internal details to client apps.

*   **File:** `server/index.js`
*   **Fix:** Update the error handler middleware to only return detailed logs to the server console, returning a generic error string to users in production.
*   **Instruction:** Update the final error handler:
    ```javascript
    // Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      const isProduction = process.env.NODE_ENV === 'production';
      const errorMessage = isProduction ? 'Internal Server Error' : (err.message || 'Internal Server Error');
      res.status(500).json({ success: false, error: errorMessage });
    });
    ```

---

## 🔵 Priority 3: Project Maintenance & Cleanups

### 5. Add Build Directory to `.gitignore`
Vite compile folders (`dist/`) should not be tracked by git.

*   **File:** `.gitignore` (Root)
*   **Fix:** Add `dist/` and `dist/*` patterns.
*   **Instruction:** Add the following lines to your `.gitignore`:
    ```text
    # vite build output
    dist/
    /dist
    ```
    Then run `git rm -r --cached dist/` in your terminal to untrack the files from your git tree.

### 6. Introduce Request Body Validation
*   **File:** `server/routes/auth.js` & others
*   **Fix:** Standardize request validation using a library like `Zod` or `Joi` rather than basic presence checks. Ensure email structures and password lengths satisfy security policies.

---

## 🟢 Priority 4: Assets & Logs Monitoring

### 7. Move Static Images to a Dedicated CDN
*   **File:** `src/context/StarMcContext.tsx`
*   **Concern:** Ride and product assets are hotlinked from Unsplash.
*   **Fix:** Download and host images on Cloudinary, AWS S3, or similar asset hosts to guarantee media is persistent and optimized.

### 8. Set Up Structured Logging
*   **Concern:** Simple `console.log()` outputs can get lost or are hard to parse.
*   **Fix:** Integrate a logger like `Winston` or `Pino` to log error stack traces and warnings to Render's persistent log systems or aggregators (e.g. Logtail).
