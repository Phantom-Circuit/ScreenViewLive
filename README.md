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
  <br>https://github.com/Phantom-Circuit/ScreenViewLive/blob/main/ScreenLiveViewClient.zip
- Open sever.txt and change the IP address to the server which will be accepting the screenshots
- Run client.exe
<br>Note: The client window runs in the background. I you would like to see output from the client executable for torubleshooting purposes run "cmd.exe client.exe"

The client is now running in the background.

### Server
- Download and extract the ScreenLiveViewServer.zip
  <br>https://github.com/Phantom-Circuit/ScreenViewLive/blob/main/ScreenLiveViewServer.zip
- Run ScreenLiveViewServer.exe

The server is now running. Navigate to http://127.0.0.1:3000 in a web browser to view a live screenshot of the connected client. A screeshot of the client's active window should be shown in the web browser.

## Educational Purpose Disclosure

The ScreenLiveView project, including all associated code and documentation, is provided for **educational purposes only**. This project is intended as a learning tool and should be used as a way to explore and understand the technologies and programming techniques involved in real-time data transmission and web-based interfaces.

### Usage Guidelines

- **Responsible Use**: This project should be used in a manner that is respectful of privacy and in compliance with applicable laws and regulations. Users are responsible for ensuring that their use of ScreenLiveView complies with all legal and ethical standards.
- **No Warranty**: This project is provided "as is", without warranty of any kind. The creators and contributors are not responsible for any consequences arising from the use of this project.
- **Non-Commercial Use**: ScreenLiveView is meant for educational, non-commercial use. It should not be used for commercial purposes without proper modifications and compliance checks relevant to the intended use case.

By using or contributing to the ScreenLiveView project, you acknowledge and agree to these terms.
