# Setup Private Git Server

## At Server End

1. Create Git user

   ```bash
   sudo adduser git
   ```

2. Generate SSH folder

   ```bash
   mkdir .ssh && chmod 700 .ssh
   touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
   ```

3. Add client public SSH keys to .ssh/authorized_keys

## Push existing project to the git-server

### At Server End

1. Create bare git repo to push

   ```bash
   git init --bare project.git
   ```

### In Client End

1. Add remote origin to the git-repo to push

   ```bash
   git remote add origin git@localhost:/home/git/project.git
   ```

2. Set default upstream branch

   ```bash
   git branch --set-upstream-to=origin/master master
   ```

3. Push the local commits to origin

   ```bash
   git push

   (or)

   git push -u origin master
   ```

## Clone existing remote repo from the git-server

   ```bash
   git clone git@localhost:/home/git/project.git
   ```
