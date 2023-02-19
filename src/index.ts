const core = require('@actions/core');
const github = require('@actions/github');
import axios from 'axios';

async function setStatus(deploymentId: string, status: string, deps: {
    repo: string;
    token: string;
}) {
    const res = await axios.post(`https://api.github.com/repos/${deps.repo}/deployments/${deploymentId}/statuses`, 
        {
            state: status,
        },
        { 
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${deps.token}`,
                'X-GitHub-Api-Version': '2022-11-28',
                'User-Agent': '@lagrowthmachine-script',
            },
        }
    );
}

async function run() {
    try {
        const context = github.context;
        const token = core.getInput("token", { required: true, trimWhitespace: true });
        const deploymentId = core.getInput("deployment_id", { required: true, trimWhitespace: true }) || context.ref;
        const status = core.getInput("status", { required: true, trimWhitespace: true });
        const repo = `${context.repo.owner}/${context.repo.repo}`;
        await setStatus(deploymentId, status, { repo, token })
    } catch (error) {
        if (error instanceof Error) {
            core.error(error);
            core.setFailed(error.message);
        } else {
            core.error(`Unknown error`);
            core.setFailed(`Unknown error`);
        }
    }
}

run();