// /api/bounce.js
export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const code  = url.searchParams.get("code");
    const scope = url.searchParams.get("scope") || "";
    const state = url.searchParams.get("state") || "";

    if (!code) return res.status(400).send("Missing code");

    const appScheme = "assaulttrackerplus://oauth";
    const target = `${appScheme}?code=${encodeURIComponent(code)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;

    res.status(302).setHeader("Location", target).end();
  } catch (e) {
    res.status(500).send(String(e));
  }
}
