# Wealth Manager Web (Next.js + Supabase MVP)

A lightweight, secure, and scalable Personal Finance MVP built with Next.js and Supabase. This project provides email-based authentication, transaction CSV import, and a basic dashboard for viewing imported data.

---

## Features

* User Authentication: Magic-link login with Supabase Auth
* CSV Transaction Import: Parse and upload transaction data via CSV
* Supabase Backend: Stores users and transactions in PostgreSQL
* Modular Structure: Ready for budget views, charts, and AI insights

---

## Tech Stack

* Frontend: Next.js (React) with TypeScript
* Styling: Tailwind CSS (optional)
* Backend: Supabase (PostgreSQL + Auth)
* CSV Parsing: PapaParse
* Hosting: Vercel / Netlify / Custom GitLab CI

---

## Prerequisites

* Windows 11 / macOS / Linux
* Node.js v16+ (v18 LTS recommended)
* npm or yarn
* Git
* Supabase account (free tier)

---

## Project Setup

1. Clone the repo

   ```bash
   git clone git@gitlab.com:<your-username>/wealth-manager-web.git
   cd wealth-manager-web
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables

   * Create a file named `.env.local` in the project root
   * Add the following keys:

     ```ini
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     ```
   * Do not commit `.env.local`; it is included in `.gitignore`.

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Navigate to `http://localhost:3000` to view in the browser.

---

## Folder Structure

```
wealth-manager-web/
├── pages/
│   ├── index.tsx       # Auth (magic-link sign-in)
│   ├── dashboard.tsx   # CSV import & user dashboard
│   └── api/
│       └── upload.ts   # (Optional) secure service-role CSV endpoint
├── lib/
│   └── supabaseClient.ts # Supabase client wrapper
├── public/             # Static assets
├── styles/             # Global styles (Tailwind configs)
├── next.config.js      # Next.js configuration
├── .env.local          # Environment variables (ignored)
├── package.json        # Project metadata & scripts
└── README.md           # This file
```

---

## Available Scripts

* `npm run dev` - Run app in development mode
* `npm run build` - Build production bundle
* `npm start` - Start the production server
* `npm run lint` - Run ESLint

---

## Deployment

* Vercel: Connect your GitLab repo, and it auto-deploys on push.
* Netlify: Configure build command `npm run build` and publish directory `out`.
* Custom: Use GitLab CI/CD or Docker for self-hosted deployments.

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/XYZ`)
3. Commit your changes (`git commit -m "feat: Add XYZ"`)
4. Push to the branch (`git push origin feature/XYZ`)
5. Open a merge request

Please follow the existing code style and update tests where applicable.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

* Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
* Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
* PapaParse: [https://www.papaparse.com](https://www.papaparse.com)
