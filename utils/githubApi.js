const axios = require("axios");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;

exports.createGitHubIssue = async(title,body)=>{

    const res = await axios.post(`https://api.github.com/repos/${GITHUB_REPO}/issues`,{

        title,
        body

    },
    {
        headers:{
            Authorization:`token ${GITHUB_TOKEN}`,
            Accept:"application/vnd.github.v3+json"
        }
    }
) ;
return res.data;
}

exports.closeGitHubIssue = async (issueUrl) => {
  const parts = issueUrl.split('/');
  const owner = parts[3];
  const repo = parts[4];
  const issueNumber = parts[6];

  await axios.patch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
    { state: 'closed' },
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    }
  );
};


