# Setup static IP in Linux (Ubuntu Focal)

## Method 1: Via GUI

1. In `Gnome-Settings`, click on either `Network` or `Wi-Fi` tab, depending on the interface you would like to modify

2. Click on the gear icon next to the interface name to open the interface settings

3. Goto the `IPv4` tab and select `IPv4 Method` as `Manual`

4. Enter your static IP address, Netmask and Gateway

5. Click on the `Apply` button

6. Verify by using the command `ip a`.

## Method 2: Via Backend

1. Edit the network configuration file as below:

    **/etc/netplan/01-network-manager-all.yaml:**

    ```bash
    network:
      version: 2
      renderer: NetworkManager
      wifis:
        WIFI_INTERFACE:
          dhcp4: false
          addresses: [192.168.1.10/24]
          gateway4: 192.168.1.1
          nameservers:
            addresses: [8.8.8.8, 8.8.4.4]
          access-points:
            "WIFI_SSID":
              password: "WIFI_PASSWORD"
    ```

    **Ethernet Configs:**

    ```bash
      ethernets:
        ETHERNET_INTERFACE:
          dhcp4: no
          addresses: [192.168.1.10/24]
          gateway4: 192.168.1.1
    ```

    **Notes:**
    > Define '`nameservers`' to access the internet.
    >
    > Observed '`Conflicting default route declarations`' error while defining `wifis` and `ethernets` with same gateway.

2. Apply and test the changes: `sudo netplan try`

3. Apply the changes to the network configuration: `sudo netplan apply`

   This will create new access-points for the configured ports (Wifi/Ethernet) with the suffix of '`netplan-<interface-name>-SSID/EthernetPort`'.

   **Example:**
     - netplan-wlp0s20f3-WIFISSID
     - netplan-enp4s0

4. Select the new netplan access-point to use the static IP.

## Optional Steps

- Verify the IP address using any of the below commands:

  ```bash
  ip -a
  ip link
  ifconfig -a
  ```

- Refresh host IP address:

  ```bahs
  sudo ip addr flush wlp0s20f3 &&
  sudo systemctl restart network-manager.service
  ```
