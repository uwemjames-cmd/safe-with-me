# Safe With Me
1. `npm install`; copy `.env.example` to `.env.local` and add your Supabase URL + anon key.
2. Supabase SQL editor: run `supabase/schema.sql`.
3. Supabase > Authentication: leave sign-ups ON, turn OFF "Confirm email". REQUIRED: set NEXT_PUBLIC_VAULT_EMAIL in .env.local to a real email you own, e.g. yourname+inemvault@gmail.com (internal account name only; no mail is sent). Restart the dev server after editing.
   Open the site and set the secret password right away: whoever sets it first owns the vault.
4. Add `public/hero.mp4` + `public/hero.jpg`, and memory media in `public/memories/` (see README.txt there).
5. `npm run dev`. Deploy to Vercel (https is required for the vault encryption on phones).
Only Memories, Plan and Reflect are locked. Home and the rest are open. They ask for her secret vault password every time she opens them; that password encrypts her entries before they reach Supabase and cannot be recovered.
Fill in: lib/love.ts, lib/memories.ts, lib/opportunities.ts, lib/tips.ts.
