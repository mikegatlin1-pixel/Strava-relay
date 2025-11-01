// Receives Strava's web redirect (https://<relay>/api/bounce?code=...)
// Immediately 302-redirects into your iOS app custom scheme so the app gets ?code=...

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const code  = url.searchParams.get("code");
    const scope = url.searchParams.get("scope") || "";
    const state = url.searchParams.get("state") || "";

    if (!code) {
      return res.status(400).send("Missing code");
    }

    // ⚠️ Must match your app's URL scheme + host
    const appScheme = "assaulttrackerplus://oauth";

    // Build deep link back to your app with code/scope/state
    const target = `${appScheme}?code=${encodeURIComponent(code)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;

    res.status(302).setHeader("Location", target).end();
  } catch (e) {
    res.status(500).send(String(e));
  }
}
