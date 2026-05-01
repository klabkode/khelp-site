# Opengrok Indexer

## Opengrok in Docker

```bash
opengrok-indexer -a /opengrok/lib/opengrok.jar -- -s /opengrok/src -d /opengrok/data -c /usr/local/bin/ctags -W /opengrok/etc/configuration.xml -H -P -S -G -U http://localhost:8080
```

## opengrok/localhost

```bash
opengrok-indexer -J=-Djava.util.logging.config.file=/opengrok/etc/logging.properties -a /opengrok/dist/lib/opengrok.jar -- -c /usr/bin/ctags -s /opengrok/src -d /opengrok/data -W /opengrok/etc/configuration.xml -H -P -S -G -U http://localhost:8080/source
```
