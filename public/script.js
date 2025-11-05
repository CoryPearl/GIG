var repos;

async function fetchRepos() {
  const resp = await fetch('/repos');
  if (!resp.ok) {
    document.getElementById('repos').innerHTML =
      'Not logged in or failed to fetch repos';
    return;
  }

  const repos = await resp.json();
  let html = '<ul>';
  repos.forEach((r) => {
    html += `<li>
        <a href="${r.html_url}" target="_blank">${r.full_name}</a> 
        - ${r.private ? 'Private' : 'Public'} 
        - ${r.language || 'No language'}
      </li>`;
  });
  html += '</ul>';
  document.getElementById('repos').innerHTML = html;
}

async function checkLogin() {
  const resp = await fetch('/status');
  const data = await resp.json();

  if (data.loggedIn) {
    // Already logged in, fetch repos automatically
    // fetchRepos();
  } else {
    document.getElementById('repos').innerHTML =
      'Please log in to see your repos.';
  }
}
checkLogin();

document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = '/login';
});

document.getElementById('fetch-btn').addEventListener('click', async () => {
  const resp = await fetch('/repos');
  if (!resp.ok) {
    document.getElementById('repos').innerHTML =
      'Not logged in or failed to fetch repos';
    return;
  }

  repos = await resp.json();
  let html = '<ul>';
  repos.forEach((r) => {
    html += `<li>
        <a href="${r.html_url}" target="_blank">${r.full_name}</a> 
        - ${r.private ? 'Private' : 'Public'} 
        - ${r.language || 'No language'}
      </li>`;
  });
  html += '</ul>';
  document.getElementById('repos').innerHTML = html;
});

document.getElementById('send-btn').addEventListener('click', async () => {
  const option = document.getElementById('myDropdown').value;
  const response = await fetch('/sendRepoData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repos, option }), // fixed
  });
  const data = await response.json();
  console.log(data.data.response.candidates[0].content.parts[0].text);
});
