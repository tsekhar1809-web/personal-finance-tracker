# batch6

## Goal investment ideas

Goal planning keeps its calculations in the application and requests public investment information through the authenticated `/api/goal-investments` endpoint. The endpoint verifies the signed-in Supabase user and keeps the Gemini credential on the server.

Configure these Vercel environment variables for Preview and Production:

- `SUPABASE_URL`: the Supabase project URL.
- `SUPABASE_ANON_KEY`: the Supabase publishable/anon key used by this application.
- `GEMINI_API_KEY`: a newly rotated Google AI Studio key. Never put this value in HTML, JavaScript, or source control.
- `GEMINI_MODEL` (optional): the preferred Gemini model; supported fallbacks are attempted when unavailable.

Rotate any Gemini key previously placed in a browser file before deploying. After setting the environment variables, redeploy Preview and Production.
