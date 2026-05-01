# Git Pretty Output Formats

## Variables

```bash
%C(...) : Color specifier for output formatting
%x40 : Specify arbitrary byte in hexadecimal
%h   : Abbreviated commit hash
%H   : Full commit hash
%an  : Author name
%ae  : Author email
%ad  : Author date
%cn  : Committer name
%ce  : Committer email
%s   : Subject (commit message)
%f   : The sanitized subject line, suitable for a filename
%b   : Body (commit message)
%B   : Raw body (unwrapped subject and body)
%cd  : Commit date (format respects --date= option)
%cr  : Relative date (like '2 hours ago')
%ci  : Author date, strict ISO 8601 format
%cn  : Committer name
%ce  : Committer email
%cn  : Committer name
%ce  : Committer email
%C(auto) : Resets color
```

## Formats

```bash
format  : Specify a custom format string
medium  : Default format
full    : Includes commit message body
fuller  : Similar to full, with more details
oneline : Condensed format with one line per commit
short   : Shortened format with author, date, and subject
email   : Similar to short but includes email addresses
raw     : Raw output with separators
```

## Git Pretty Color Formats

### Basic Colors

```bash
%Cred%     : Red
%Cgreen%   : Green
%Cyellow%  : Yellow
%Cblue%    : Blue
%Cmagenta% : Magenta
%Ccyan%    : Cyan
%Cwhite%   : White
```

### Bright Colors

```bash
%Cred_bold%     : Bold Red
%Cgreen_bold%   : Bold Green
%Cyellow_bold%  : Bold Yellow
%Cblue_bold%    : Bold Blue
%Cmagenta_bold% : Bold Magenta
%Ccyan_bold%    : Bold Cyan
%Cwhite_bold%   : Bold White
```

### Background Colors

```bash
%C(red)%     : Red background
%C(green)%   : Green background
%C(yellow)%  : Yellow background
%C(blue)%    : Blue background
%C(magenta)% : Magenta background
%C(cyan)%    : Cyan background
%C(white)%   : White background
```

### Resetting Color

```bash
%C(reset)% : Resets color to default
```

### Auto Colors

```bash
%C(auto)% : Automatically selects color based on terminal capabilities
```
