# PS Command Usage

## Print all process stats

```bash
ps -elf
ps -elLf # Print information about threads
```

## Print process stats for a PID

```bash
ps 1
ps -p 1
ps -q 1
ps -lf -q 1
ps -elf -q 1 # -e is overrided by -q
ps elf -p $(echo $$) # PS of current process
```

## Print process stats for a list of PIDs

```bash
ps -lf -p  1,2,3,4
```

## Print process stats for a Process/Command name

```bash
ps -C systemd
ps -lf -C systemd
```

## Print only the PID

```bash
ps -C systemd -o pid
ps -C systemd -o pid=  # Without PS Header
```

## Print only the name of PID

```bash
ps -q 1 -o comm
ps -q 1 -o comm=  # Without PS Header
```

## PS command output fields

```bash
┌────────┬────────────────────────────────────────────┐
│ Header │ Description                                │
├────────┼────────────────────────────────────────────┤
│ %CPU   │ How much of the CPU the process is using   │
│ %MEM   │ How much memory the process is using       │
│ ADDR   │ Memory address of the process              │
│ C/CP   │ CPU usage and scheduling information       │
│ CMD    │ Name of the process, including arguments   │
│ LWP    │ Thread ID (Light weight process)           │
│ NLWP   │ Number of LWPs (Threads) in the process    │
│ NI     │ Nice Value (User set priority)             │
│ F      │ Flags                                      │
│ PID    │ Process ID                                 │
│ PPID   │ Parent Process ID                          │
│ PRI    │ Priority of the process                    │
│ RSS    │ Real Memory/Active memory in RAM           │
│ S/STAT │ Process status code                        │
│ STIME  │ Start time of the process                  │
│ START  │ STIME/Start time of the process            │
│ SZ     │ Size in physical page of the process       │
│ VSZ    │ Virtual memory size of the process         │
│ TIME   │ Total CPU usage                            │
│ TT/TTY │ Terminal associated with the process       │
│ UID    │ USER: Username of the process's owner      │
│ WCHAN  │ Memory address of the event that waiting   │
└────────┴────────────────────────────────────────────┘
```

## Process stats of current Process

```bash
ps -q $(echo $$)
```

## Process stats of current Process with Environment

```bash
ps -p $(echo $$) e
```

## Truncate PS Header

```bash
ps h
ps --no-headers
ps -q 1 -o comm=      # Print only command without Header
ps -p 1 | awk 'NR>1'  # Truncated Header with AWK command
```

## Print process tree

```bash
ps f
ps axjf
ps -elfH
pstree (similar command)
```

## Print process stats of current user

```bash
ps -lf -u $USER
```

## PS output modifiers

- **a** - List all processes with a terminal (tty) / All processes associated with the current terminal
- **c** - Show true command name of the process
- **e** - Show the environment after the command
- **f** - ASCII art process hierarchy
- **h** - No header

## Customizing the PS output format

```bash
ps -eo uname,pid,ppid,nlwp,pcpu,pmem,psr,start_time,tty,time,args
```

**pcpu**:

CPU utilization of the process under the column %CPU in percentage.

It is the CPU time used by the process divided by the real clock time the process has been running.

**pmem**:

Memory utilization of the process under the column %MEM in percentage, being the ratio of process's resident set size (RSS) to the total physical memory on the machine.

**nlwp**:

Number of threads in a process

**args**:

Command line arguments of the process

## Sorting the PS output

We can sort the ps command output using the `–sort spec` option.

The spec is `[+|-]key[`,`[+|-]key[…]]`.The `+` sign is the default and indicates increasing numerical or lexicographic order.

So, if we wish to know the processes consuming high CPU and memory, the following ps command would do the job.

```bash
ps -eo uname,pid,ppid,nlwp,pcpu,pmem,psr,start_time,tty,time,args --sort -pcpu,-pmem
```

Adjust wchan output length with `wchan:14`.

```bash
ps -o pid,tid,wchan:14,comm -p 1
```

## Top 10 CPU and MEM consuming processes

```bash
ps -elf --sort -pcpu,-pmem | sed '10q'
ps -eo uname,pid,ppid,nlwp,pcpu,pmem,psr,start_time,tty,time,comm --sort -pcpu,-pmem | sed '10q'
```

## Print Session Information

```$ ps s
  UID   PID          PENDING          BLOCKED          IGNORED           CAUGHT STAT TTY        TIME COMMAND
 1000 10339 0000000000000000 0000000000010000 0000000000384004 000000004b813efb Ss   pts/2      0:00 -bash
 1000 11197 0000000000000000 0000000000010000 0000000000384004 000000004b813efb Ss   pts/0      0:01 -bash
```

- `PENDING` - Signals that are currently pending for the process
- `BLOCKED` - Signals that are currently blocked for the process
- `IGNORED` - Signals that the process has chosen to ignore
- `CAUGHT`  - Signals that the process has caught or registered a custom handler

## PS Output variants

```bash
$ ps
  PID TTY          TIME CMD
11197 pts/0    00:00:01 bash
22627 pts/0    00:00:00 ps
```

```bash
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000 11197 11176  0  80   0 - 29351 do_wai pts/0    00:00:01 bash
0 R  1000 22676 11197  0  80   0 - 38332 -      pts/0    00:00:00 ps
```

```bash
$ ps -ly
S   UID   PID  PPID  C PRI  NI   RSS    SZ WCHAN  TTY          TIME CMD
S  1000 11197 11176  0  80   0  4064 29351 do_wai pts/0    00:00:01 bash
R  1000 22773 11197  0  80   0  1508 38332 -      pts/0    00:00:00 ps
```

```bash
$ ps -lL
F S   UID   PID  PPID   LWP  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000 11197 11176 11197  0  80   0 - 29351 do_wai pts/0    00:00:01 bash
0 R  1000 22685 11197 22685  0  80   0 - 38332 -      pts/0    00:00:00 ps
```

```bash
$ ps -lLf
F S UID        PID  PPID   LWP  C NLWP PRI  NI ADDR SZ WCHAN  STIME TTY          TIME CMD
0 S user  11197 11176 11197  0    1  80   0 - 29351 do_wai 00:09 pts/0    00:00:01 -bash
0 R user  22697 11197 22697  0    1  80   0 - 38863 -      02:59 pts/0    00:00:00 ps -lLf
```

```bash
$ ps -lLfF
F S UID        PID  PPID   LWP  C NLWP PRI  NI ADDR SZ WCHAN    RSS PSR STIME TTY          TIME CMD
0 S user  11197 11176 11197  0    1  80   0 - 29351 do_wai  4064   0 00:09 pts/0    00:00:01 -bash
0 R user  22737 11197 22737  0    1  80   0 - 38863 -       1852   4 03:00 pts/0    00:00:00 ps -lLfF
```

```bash
$ ps u
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
user  10339  0.0  0.1 117660  4300 pts/2    Ss   Jan27   0:00 -bash
user  11197  0.0  0.1 117404  4068 pts/0    Ss   00:09   0:01 -bash
user  14623  0.0  0.0 120152  2708 pts/2    S+   00:54   0:00 man ps
user  14637  0.0  0.0 110440   976 pts/2    S+   00:54   0:00 less -s
user  23082  0.0  0.0 155452  1864 pts/0    R+   03:05   0:00 ps u
```

```bash
$ ps t/ps -t
  PID TTY      STAT   TIME COMMAND
11197 pts/0    Ss     0:01 -bash
23104 pts/0    R+     0:00 ps t
```

```bash
$ ps s
  UID   PID          PENDING          BLOCKED          IGNORED           CAUGHT STAT TTY        TIME COMMAND
 1000 10339 0000000000000000 0000000000010000 0000000000384004 000000004b813efb Ss   pts/2      0:00 -bash
 1000 11197 0000000000000000 0000000000010000 0000000000384004 000000004b813efb Ss   pts/0      0:01 -bash
```

```bash
$ ps f
  PID TTY      STAT   TIME COMMAND
23274 pts/1    Ss     0:00 -bash
24310 pts/1    S+     0:00  \_ man ps
24323 pts/1    S+     0:00      \_ less -s
11197 pts/0    Ss     0:01 -bash
24336 pts/0    R+     0:00  \_ ps f
```

```bash
$ ps a
  PID TTY      STAT   TIME COMMAND
 1649 tty1     Ssl+   0:00 /usr/bin/X :0 -background none -noreset -audit 4 -verbose -auth /run/gdm/auth-for-gdm-zcy3GA/database -seat seat0 -nolisten tcp vt1
10339 pts/2    Ss     0:00 -bash
11197 pts/0    Ss     0:01 -bash
14623 pts/2    S+     0:00 man ps
14637 pts/2    S+     0:00 less -s
```

```bash
$ ps e
  PID TTY      STAT   TIME COMMAND
10339 pts/2    Ss     0:00 -bash <ENVIRONMENT PARAMETERS>
11197 pts/0    Ss     0:01 -bash <ENVIRONMENT PARAMETERS>
```
