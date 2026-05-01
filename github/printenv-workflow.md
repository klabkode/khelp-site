# GitHub Actions Environment Variables

```bash
CI
GITHUB_ACTION
GITHUB_ACTION_PATH
GITHUB_ACTION_REPOSITORY
GITHUB_ACTIONS
GITHUB_ACTOR
GITHUB_ACTOR_ID
GITHUB_API_URL
GITHUB_BASE_REF
GITHUB_ENV
GITHUB_EVENT_NAME
GITHUB_EVENT_PATH
GITHUB_GRAPHQL_URL
GITHUB_HEAD_REF
GITHUB_JOB
GITHUB_PATH
GITHUB_REF
GITHUB_REF_NAME
GITHUB_REF_PROTECTED
GITHUB_REF_TYPE
GITHUB_REPOSITORY
GITHUB_REPOSITORY_ID
GITHUB_REPOSITORY_OWNER
GITHUB_REPOSITORY_OWNER_ID
GITHUB_RETENTION_DAYS
GITHUB_RUN_ATTEMPT
GITHUB_RUN_ID
GITHUB_RUN_NUMBER
GITHUB_SERVER_URL
GITHUB_SHA
GITHUB_STEP_SUMMARY
GITHUB_WORKFLOW
GITHUB_WORKFLOW_REF
GITHUB_WORKFLOW_SHA
GITHUB_WORKSPACE
RUNNER_ARCH
RUNNER_DEBUG
RUNNER_NAME
RUNNER_OS
RUNNER_TEMP
RUNNER_TOOL_CACHE
```

GitHub Actions variables list script to print out all GitHub Actions environment variables:

1. Create a simple YAML file that runs on a push to main or master
2. Add the job to run the command mentioned in `run` field on Ubuntu image
3. Run the build
4. View the GitHub Action environment variable list in the job status window

## Example GitHub Actions Workflow

**.github/workflows/printenv.yaml:**

```yaml
name: GitHub Actions Environment
on:
  push:
    branches: [ master ]
jobs:
  printenv:
    runs-on: ubuntu-latest
    steps:
      - name: Print environment varaibles
        run: env
```
