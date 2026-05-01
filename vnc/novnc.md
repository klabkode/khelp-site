# Setup noVNC client: VNC over web browser

1. Setup VNC server

2. Install **noVNC** dependencies

   ```bash
   sudo apt -y install novnc python3-websockify python3-numpy
   ```

3. Create SSL certificates for secure connection (optional)

   ```bash
   openssl req -x509 -nodes -newkey rsa:3072 -keyout novnc.pem -out novnc.pem -days 3650
   ```

4. Start **noNVC* server

   ```bash
   websockify -D --web=/usr/share/novnc/ --cert=/home/ubuntu/novnc.pem 6080 localhost:5901
   ```

5. Explore the VNC client in web browser

   <http://localhost:6080/vnc_lite.html>
