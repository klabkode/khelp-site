# Git Remote Handling

## Check Existing Remotes

```bash
git remote -v
```

## Add a New Remote

```bash
git remote add origin git@localhost:/home/git/reponame.git
```

```bash
git remote add origin git@github.com:username/reponame.git
```

## Update Remote URLs (Optional)

```bash
git remote set-url origin https://new-url.git
```

## Remove Git Remote

```bash
git remote remove origin
```

## Muliple Remotes

```bash
$ git remote -v
  origin-1 git@gitlab.com:username/reponame.git (push)  << Remote-1
  origin-2 git@github.com:username/reponame.git (push)  << Remote-2
```

**Push Changes to Gitlab Remote:**

```bash
git push <origin-1>

or

git push <origin-2> master
```
