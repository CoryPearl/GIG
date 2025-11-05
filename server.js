require('dotenv').config({ path: './server-assets/.env' });
const express = require('express');
const path = require('path');
const session = require('express-session');
const axios = require('axios');
const repos = require('./server-assets/fetch-repos');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// --- Routes ---

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GitHub OAuth login
app.get('/login', (req, res) => {
  const redirect_uri = `http://localhost:${PORT}/callback`;
  const scope = 'repo'; // public + private repos
  const url = `https://github.com/login/oauth/authorize?client_id=${
    process.env.GITHUB_CLIENT_ID
  }&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}`;
  res.redirect(url);
});

// OAuth callback
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send('No code provided');

  try {
    const tokenResp = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    const token = tokenResp.data.access_token;
    if (!token) return res.send('Failed to get access token');

    req.session.token = token;
    res.redirect('/'); // back to frontend
  } catch (err) {
    console.error(err.response ? err.response.data : err);
    res.send('OAuth failed');
  }
});

// Fetch repos for logged-in user
app.post('/repos', async (req, res) => {
  const token = req.session.token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  try {
    // You can use your existing fetch-repos module, passing the token
    const data = await repos.get(token);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
