# Mandel Experts Survey

This project implements a Hebrew RTL survey for updating experts' content fields and activity types for the Mandel Foundation Israel experts interface.

## Features

- Multi-step Hebrew survey flow
- RTL layout and accessible form controls
- Validation for required selections
- Server-side submission route for Power Automate forwarding
- Review and thank-you screens

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment example:
   ```bash
   cp .env.example .env.local
   ```
3. Update the Power Automate endpoint in Vercel or local environment variables.
4. Start the app:
   ```bash
   npm run dev
   ```

## Environment variables

- POWER_AUTOMATE_URL: the HTTPS endpoint used by the server-side submission route

## Notes

- The Mandel logo is expected at /mandel-israel-logo.png. Add the official asset to public/mandel-israel-logo.png before production use.
- The submission route forwards data to Power Automate and does not write directly to Excel from the browser.
