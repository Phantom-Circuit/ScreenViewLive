# ScreenLiveView

ScreenLiveView is a dynamic, real-time screen capture tool comprising a C# client and a Node.js server. This application efficiently captures and transmits screenshots of the active window from the client's computer to the server every 5 seconds, making them accessible in real-time through a web interface.

## Features

- **Real-time Screen Capture**: Captures the current active window's screenshot every 5 seconds.
- **Efficient Data Transmission**: Quickly sends screenshots to the Node.js server.
- **Live Web Interface**: View live screen captures via any web browser on port 3000.
- **Easy to Set Up**: Simple setup process for both client and server.

## Installation

The compiled versions are available to download.

### Client
- Download and extract the ScreenLiveViewClient.zip
- Open sever.txt and change the IP address to the server which will be accepting the screenshots
- Run client.exe
/nNote: The client window runs in the background. I you would like to see output from the client executable for torubleshooting purposes run "cmd.exe ScreenLiveViewClient.exe"

The client is now running in the background.

### Server
- Download and extract the ScreenLiveViewServer.zip
- Run ScreenLiveViewServer.zip

The server is now running. Navigate to http://127.0.0.1:3000 in a web browser to view a live screenshot of the connected client. A screeshot of the client's active window should be shown in the web browser.
