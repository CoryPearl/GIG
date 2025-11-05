async function getRepos() {
  try {
    const userId = document.getElementById('input').value;
    const responce = await fetch('/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const text = await responce.text();
  } catch (err) {
    console.log(err);
  }
}

document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = '/login';
});

document.getElementById('fetch-btn').addEventListener('click', async () => {
  const resp = await fetch('/repos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const data = await resp.json();
  document.getElementById('repos').innerHTML = JSON.stringify(data, null, 2);
});
