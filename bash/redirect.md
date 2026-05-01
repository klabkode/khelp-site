# Bash Output Redirection

## Redirect @echo output to stdout

```bash
echo "Helloworld!"
```

## Redirect @echo output to stderr

```bash
echo "Helloworld!" > &2
```

## Redirect @echo output to file

```bash
echo "Helloworld!" > <file-name>
```

## Redirect @echo output to sudoer's file

```bash
echo "Helloworld" | sudo tee <sudoer-file>
```

## Redirect @echo output to sudoer's file with new shell

```bash
sudo sh -c 'echo "Helloworld!" > <sudoer-file>'
```

## Redirect command output (stdout and stderr) to stdout

```bash
bash-command 2>&1
```

```bash
bash-command &> /dev/stdout
```

## Redirect command output (stdout and stderr) to stderr

```bash
bash-command 1>&2
```

## Redirect both stdin and stderr streams to the /dev/null

```bash
bash-command &> /dev/null
```

```bash
bash-command > /dev/null 2>&1
```

## To redirect both `stderr` to a file and display it on the console as `stdout`

```bash
bash-command 2> >(tee build-err.log >&2) | tee build.log
```
