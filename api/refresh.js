export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const { refresh_token } = req.body || {};
    if (!refresh_token) return res.status(400).json({ error: "Missing refresh_token" });

    const r = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token
      })
    });

    const j = await r.json();
    if (!r.ok) return res.status(r.status).json(j);
    res.status(200).json(j);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
