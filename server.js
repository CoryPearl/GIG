require('dotenv').config({ path: './server-assets/.env' });
const express = require('express');
const path = require('path');
const session = require('express-session');
const axios = require('axios');
const gemini = require('./server-assets/ai-req.js');

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

app.get('/repos', async (req, res) => {
  const token = req.session.token;
  if (!token) return res.status(401).send('Not logged in');

  try {
    let page = 1;
    const per_page = 100;
    const repos = [];

    while (true) {
      const response = await axios.get(
        `https://api.github.com/user/repos?per_page=${per_page}&page=${page}`,
        {
          headers: { Authorization: `token ${token}` },
        }
      );

      repos.push(...response.data);
      if (response.data.length < per_page) break; // last page
      page++;
    }

    res.json(repos); // send full repo list to frontend
  } catch (err) {
    console.error(err.response ? err.response.data : err);
    res.status(500).send('Failed to fetch repos');
  }
});

app.get('/status', (req, res) => {
  if (req.session.token) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post('/sendRepoData', async (req, res) => {
  const { repos, option } = req.body;
  let fullInfo = '';

  for (const e of repos) {
    const repoInfo =
      'Name: ' +
      e.name +
      'Language: ' +
      e.language +
      'Description: ' +
      e.description +
      ' ';
    fullInfo += repoInfo;
  }

  var response;

  if (option == '1') {
    response = await gemini.askGemini(
      `I’m going to give you a list of programming and 
    computer science projects I’ve already completed. Based on that list, generate a 
    bulleted list of completely new and original project ideas that build on my past experience 
    but explore new directions. Each item should just be the project title or concept — no descriptions or extra info.
    Here’s my list of past projects:` + fullInfo
    );
  } else {
    response = await gemini.askGemini(
      `I’m going to give you a list of programming and computer science projects 
    I’ve already completed. Analyze the list to identify the main skills, programming 
    languages, technologies, and problem types I’ve explored. Then, generate a set of completely new and original project 
    ideas that build on my experience — projects that push my technical depth, creativity, or scope, but aren’t just simple 
    extensions or remakes of what I’ve already done.
    For each new project idea, include:
    Title – a short, catchy name.
    Description (2–3 sentences) – what the project does and its main purpose.
    Why It’s New – how it expands beyond or differs from my previous work.
    Tech Focus – which programming skills, algorithms, frameworks, or technologies I’d learn or improve by building it.
    Here’s my list of past projects:` + fullInfo
    );
  }
  res.json({ data: response });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
