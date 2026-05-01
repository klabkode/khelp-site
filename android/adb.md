# ADB Command Usage

Android Debug Bridge (ADB) commands for developers, testers, and power users.

### 🔧 Basic Setup

```bash
adb devices               # List connected devices
adb version               # Show ADB version
adb start-server          # Start ADB server
adb kill-server           # Stop ADB server
```

### 📲 Device Management

```bash
adb reboot                # Reboot device
adb reboot bootloader     # Reboot into bootloader
adb reboot recovery       # Reboot into recovery
adb shell                 # Start interactive shell
adb root                  # Restart adbd with root permissions
adb remount               # Remount /system as read-write
```

### 📦 App Management

```bash
adb install app.apk                          # Install an APK
adb install -r app.apk                       # Reinstall APK (keep data)
adb uninstall <package>                      # Uninstall an app
adb uninstall -k <package>                   # Uninstall but keep data/cache
adb shell pm list packages                   # List all installed packages
adb shell pm path <package>                  # Show APK path
adb shell pm clear <package>                 # Reset (clear data + cache)
adb shell monkey -p <package> -v 1           # Launch app via monkey tool
```

### Install APK from PC

```bash
adb install Device-ID-1.3.2.apk
```

### Install APK from Device Shell
>
> Requires file in `/data/local/tmp/`, not `/sdcard/`

```bash
adb push Device-ID-1.3.2.apk /data/local/tmp/
adb shell pm install /data/local/tmp/Device-ID-1.3.2.apk
```

### Reinstall or Update APK

```bash
adb shell pm install -r /data/local/tmp/Device-ID-1.3.2.apk
```

### Clean App Data

Clear App data without uninstalling

```bash
adb shell pm clear com.whatsapp
```

### Cleanup

```bash
adb shell rm /data/local/tmp/Device-ID-1.3.2.apk
```

### 🗃️ File Transfer

```bash
adb push localfile /sdcard/                  # Push file to device
adb pull /sdcard/remote.txt local.txt        # Pull file from device
```

### 📂 App Data Access

```bash
adb shell run-as <package>                   # Access app data dir (debuggable apps)
adb exec-out run-as <package> ls -l          # List app files securely
adb shell dumpsys package <package>          # Get app info
```

### 💾 Backup & Restore

```bash
adb backup -apk -shared -all -f backup.ab    # Backup all apps/data (pre-Android 10)
adb restore backup.ab                        # Restore from backup
```

### 🐞 Debugging & Logs

```bash
adb logcat                                   # Live device logs
adb logcat -c                                # Clear log buffer
adb bugreport > report.zip                   # Full bugreport archive
```

### 📶 Network

```bash
adb tcpip 5555                               # Enable ADB over Wi-Fi on port 5555
adb connect <device_ip>:5555                 # Connect over Wi-Fi
adb disconnect <device_ip>                   # Disconnect from Wi-Fi device
```

### 🛑 Force Stop & Start App

```bash
adb shell am force-stop <package>            # Force stop app
adb shell am start -n <package>/<activity>   # Launch specific activity
```

### ⌨️ Input & Interaction

```bash
adb shell input tap x y                      # Simulate screen tap
adb shell input swipe x1 y1 x2 y2 duration   # Simulate swipe
adb shell input text "hello"                 # Input text
adb shell input keyevent <keycode>           # Send key event (e.g., KEYCODE_HOME = 3)
```

### 🧪 UI Automator & Screenshots

```bash
adb shell screencap -p /sdcard/screen.png    # Take screenshot
adb pull /sdcard/screen.png                  # Pull screenshot to PC
adb shell screenrecord /sdcard/demo.mp4      # Record screen
adb pull /sdcard/demo.mp4                    # Pull video to PC
```

### 🔒 Permissions & Settings

```bash
adb shell pm grant <package> <permission>    # Grant permission
adb shell pm revoke <package> <permission>   # Revoke permission
adb shell settings list global               # List global settings
adb shell settings put global <key> <value>  # Set global setting
```

### ⚙️ Developer Options Shortcuts

```bash
adb shell settings put global development_settings_enabled 1
adb shell am start -n com.android.settings/.DevelopmentSettings
```

### 📂 External Storage Access

```bash
adb shell ls /storage/emulated/0/           # Access internal SD card
adb shell df -h                             # Show disk usage
```

### 📋 Examples

- To find a package name:

  ```bash
  adb shell pm list packages | grep keyword
  ```

- To launch app from shell:

  ```bash
  adb shell monkey -p com.example.app -v 1
  ```
