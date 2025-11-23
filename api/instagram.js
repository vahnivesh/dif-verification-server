export default async function handler(req, res) {
  const { user, code } = req.query;

  if (!user || !code) {
    return res.status(400).json({ verified: false, error: "Missing params" });
  }

  try {
    const profileUrl = `https://www.instagram.com/${user}/`;

    const resp = await fetch(profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = await resp.text();
    const found = html.includes(code);

    return res.status(200).json({ verified: found });

  } catch (e) {
    return res.status(500).json({ verified: false, error: e.message });
  }
}

