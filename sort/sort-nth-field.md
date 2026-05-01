# Sort Nth filed in the list

```bash
$ sort -k4,4nr reg_before_reboot.txt | head -n 5
  Time        UID       PID    %usr %system  %guest   %wait    %CPU   CPU iodelay  Command
07:05:54        0     27861   87.85    0.00    0.00    0.00   87.85     3       0  openssl
07:05:54        0     27860   84.11    0.93    0.00    0.00   85.05     0       0  openssl
07:05:54        0     27862   81.31    0.00    0.00    0.00   81.31     2       0  openssl
07:05:54        0     27863   81.31    0.93    0.00    0.00   82.24     1       0  openssl
07:05:54        0      2784    1.87    0.00    0.00    0.00    1.87     1       0  wnc-mapid
```

**Breakout:**

```bash
  -k: key on which the sorting should be performed
      The argument to `-k` is a field specification that determines which part of each line is used as the sort key.
```

In the case of `-k4` specifies that the sorting should be based on the fourth field (column) of each line.
The `,4` indicates that the sorting should include only the fourth field, and `nr` specifies numerical sorting in reverse order (descending).
