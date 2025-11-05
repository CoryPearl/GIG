require('dotenv').config();
const { Octokit } = require('@octokit/rest');

const token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });

async function get(username) {
  const repos = await octokit.paginate('GET /users/{username}/repos', {
    username,
    per_page: 100,
    sort: 'updated',
  });
  return repos;
}

module.exports = { get };
