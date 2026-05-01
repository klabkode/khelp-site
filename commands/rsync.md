# Rsync usage

## From Remote to Local

```bash
rsync -avzh <remote-host-ip>:<remote-host-path> <local-host-path>
```

## From Local to Remote

```bash
rsync -avzh <local-host-path> <remote-host-ip>:<remote-host-path>
```

## Exclude files to sync

```bash
rsync -av --exclude='*.so' --exclude='*.swp' --exclude='.git/' username@remote_host:/path/to/source/ /path/to/destination/
```
