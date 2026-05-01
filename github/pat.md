# Manage Git Repository Using Personal Access Token

## Generate a Personal Access Token (PAT)

1. Log in to the GitHub.
2. Navigate to `SETTING > DEVELOPER SETTINGS`.
3. Click on the `Generate New Token` or `Create Token` button.
4. Provide a name of `PAT` to identify its purpose and select the required permissions based on your intended usage.

   For cloning repositories, the `repo` or `read` permissions are typically sufficient.

5. Click on the `Generate Token` button to generate your PAT.
6. Copy the generated token to your clipboard. PATs are sensitive and should be treated like passwords.

## Clone the repository with PAT

```bash
git clone https://<PAT>@github.com/username/repo.git
```

```bash
#!/bin/bash
export GITHUB_USER=username
export GITHUB_TOKEN=PAT
export GITHUB_REPOSITORY=<github-repo-name>
git clone https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}
```

If this does not work you can use:

```bash
git clone https://github.com/username/repo.git
username : <username>
password : <PAT generated in step 1>
```

## Weblinks

<https://kettan007.medium.com/how-to-clone-a-git-repository-using-personal-access-token-a-step-by-step-guide-ab7b54d4ef83>
