# Date Command Usage

## Date

```bash
date +"%D"
```

Output: MM/DD/YY

## Time

```bash
date +"%T"
```

Output: HH:MM:SS

## Time with Milliseconds

```bash
date +"%T.%3N"
```

Output: HH:MM:SS.mmm

## YYYYMMDD::HHMMSS Format

```bash
date "+%Y%m%d::%H%M%S"
```

Output: YYYYMMDD::HHMMSS

## Seconds

Current timestamp in seconds since the Unix epoch (January 1, 1970, 00:00:00 UTC):

```bash
date +%s
```

## Milliseconds

Current timestamp in milliseconds since the Unix epoch:

```bash
date +%s%3N
# or
echo $(($(date +%s%N)/1000000))
```

## Microseconds

Current timestamp in microseconds since the Unix epoch:

```bash
date +%s%6N
```

## Nanoseconds

Current timestamp in nanoseconds since the Unix epoch:

```bash
date +%s%N
```
