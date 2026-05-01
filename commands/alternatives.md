# How to use `update-alternatives` command

## Case 1

If you have multiple alternatives installed for `pip3` and want to switch
to `/usr/bin/pip3`, you can use the `--config` option with `update-alternatives`:

```bash
sudo update-alternatives --config pip3
```

This command will display a list of available alternatives for `pip3` and prompt
you to select the one you want to use.

Simply enter the number corresponding to `/usr/bin/pip3` and press `Enter` to set it as the default alternative.
