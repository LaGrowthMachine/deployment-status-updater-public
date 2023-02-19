# Github deployment creator

This action create a new deployment. We build this one for Jira integration.

    https://docs.github.com/fr/rest/deployments/deployments?apiVersion=2022-11-28

## Inputs

### `token`

**Required** github token that can create deployment. Test it before.

### `deployment_id`

**Required** Id deployment


### `status`
**Required** Can be one of: error, failure, inactive, in_progress, queued, pending, success

## Outputs

No output

## Example usage

```yaml
uses: lagrowthmachine/deployment-status-updater-public@v1.1
with:
  token: 'xxxxx'
  deployment_id: '182938298' #or steps.deployment.outputs.deployment_id
  status: 'pending'
```

