var repos = '';

const fullText = 'Welcome to ';
const gigText = 'GIG';
const headline = document.getElementById('headline');
const typingSpeed = 150;
const restartDelay = 5000;

function typeText() {
  headline.innerHTML = '';
  let i = 0;

  const interval = setInterval(() => {
    if (i < fullText.length) {
      headline.textContent += fullText[i];
    } else if (i - fullText.length < gigText.length) {
      const span = document.createElement('span');
      span.className = 'purple';
      span.textContent = gigText[i - fullText.length];
      headline.appendChild(span);
    } else {
      clearInterval(interval);
    }
    i++;
  }, typingSpeed);
}

async function fetchRepos() {
  const container = document.getElementById('repos');
  container.innerHTML =
    '<div id="loader1" class="loader" style="align-self: center"></div>';
  document.getElementById('loader1').style.visibility = 'visible';
  const resp = await fetch('/repos');
  if (!resp.ok) {
    document.getElementById('repos').innerHTML =
      'Not logged in or failed to fetch repos';
    return;
  }

  const repos1 = await resp.json();
  repos = repos1;

  container.innerHTML = '';

  repos1.forEach((r) => {
    const repoCard = document.createElement('div');
    repoCard.classList.add('repo-card');

    repoCard.innerHTML = `
    <h3><a href="${r.html_url}" target="_blank">${r.full_name}</a></h3>
    <p>${r.description ? r.description : 'No description provided.'}</p>
    <div class="repo-meta">
      <span>${r.private ? '🔒 Private' : '🌐 Public'}</span>
      <span>${r.language || 'No language'}</span>
      <span>⭐ ${r.stargazers_count || 0}</span>
    </div>
  `;

    container.appendChild(repoCard);
  });
}

async function checkLogin() {
  const resp = await fetch('/status');
  const data = await resp.json();

  if (data.loggedIn) {
    // Already logged in, fetch repos automatically
    fetchRepos();
    document.getElementById('login-btn').innerHTML =
      'Logged in with<img src="assets/git.png" alt="GitHub" />';
  }
}

document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = '/login';
});

// document.getElementById('fetch-btn').addEventListener('click', async () => {
//   const resp = await fetch('/repos');
//   if (!resp.ok) {
//     document.getElementById('repos').innerHTML =
//       'Not logged in or failed to fetch repos';
//     return;
//   }

//   repos = await resp.json();
//   let html = '<ul>';
//   repos.forEach((r) => {
//     html += `<li>
//         <a href="${r.html_url}" target="_blank">${r.full_name}</a>
//         - ${r.private ? 'Private' : 'Public'}
//         - ${r.language || 'No language'}
//       </li>`;
//   });
//   html += '</ul>';
//   document.getElementById('repos').innerHTML = html;
// });

function formatOutput(text) {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<p>$1</p>')
    .replace(/(^|\n)\s*\*\s*(.*)/g, '<li>$2</li>')
    .replace(/(\n\d+\.\s)/g, '<br><strong>$1</strong>')
    .replace(/\n/g, '<br>');

  html = `<ul>${html}</ul>`;

  return html;
}

document.getElementById('send-btn').addEventListener('click', async () => {
  if (repos != '') {
    const output = document.getElementById('output');

    output.innerHTML = '<div id="loader2" class="loader"></div>';

    output.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    document.getElementById('loader2').style.visibility = 'visible';
    const option = document.getElementById('length-select').value;
    const response = await fetch('/sendRepoData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repos, option }), // fixed
    });
    const data = await response.json();

    output.innerHTML = await formatOutput(
      data.data.response.candidates[0].content.parts[0].text
    );

    output.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
});

checkLogin();

typeText();

setInterval(typeText, restartDelay);
