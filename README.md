# Watch Dog Project Documentation

## Table of Contents

- [Overview](#overview)
- [Project Objectives](#project-objectives)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Watch Dog** is an indoor home security system designed to detect intruders, capture video evidence, send alarm notifications, and upload videos to a centralized web dashboard. The system is lightweight and designed for scalability across devices with lower hardware specifications.

### Key Features

- Intruder detection using COCO-SSD.
- Video recording triggered by detection events.
- Uploading videos to a centralized web dashboard for monitoring.
- Alarm notifications sent to users.

---

## Project Objectives

During development, the following adjustments were made:

1. **Switch from YOLO to COCO-SSD**:
   - Initially, YOLO was considered for object detection, but COCO-SSD was chosen for better support in browsers and hardware limitations.
2. **Change from Live-Streaming to Video Upload**:

   - The initial plan to live-stream data was replaced with video uploads due to scalability issues on low-spec devices.

3. **Frontend Video Processing**:
   - Processing intruder detection was moved from the web server to the client-side to reduce server load and improve scalability.

---

## System Architecture

The Watch Dog system consists of three major components:

1. **Camear Agent**:

   - Responsible for detecting intruders using COCO-SSD and triggering the Media Recorder API to capture video upon detection.
   - Sends recorded videos to the backend server for upload to the web dashboard.

2. **Backend**:

   - Stores uploaded videos and handles requests for retrieving data from the web dashboard.
   - Provides a REST API to manage users and video data.

3. **Web Dashboard**:
   - A user interface for monitoring and managing uploaded videos.
   - Displays video records of intruder events.

### Workflow

1. **Intruder Detection**: The frontend processes live webcam feed, using COCO-SSD to detect potential intruders.
2. **Video Recording**: Upon detection, the frontend triggers video recording and captures the event.
3. **Video Upload**: Once the recording ends, the video is sent to the backend for storage and display on the web dashboard.
4. **Notification**: Alarm notifications are sent to the user in real-time during detection events.

---

## Technologies Used

- **Frontend**:
  - COCO-SSD (object detection)
  - Media Recorder API (video recording)
- **Backend**:

  - Node.js (server)
  - Express.js (API handling)

- **Web Dashboard**:
  - TailwindCSS (styling)

---

## Setup and Installation

### Prerequisites

- Node.js (v14.x or later) https://nodejs.org/en/download/package-manager/current
- fmpeg https://www.ffmpeg.org/download.html
- git https://git-scm.com/

### Steps

Get app password from gmail https://myaccount.google.com/apppasswords

In the terminal

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/watch-dog.git
   cd watch-dog
   ```

2. Install dependencies

   ```bash
   npm i
   ```

3. Configure the environment variables

   Create .env file in the root folder with the following variables

   Add email address and app password from above

   ```bash
   # Database
   DATABASE_URL="file:./dev.db"

   # Email
   SENDER_EMAIL='xxxx@gmail.com'
   EMAIL_PASSWORD='************'
   ```

4. Build the project

   ```bash
   npm run build
   ```

5. Start the project

   ```bash
   npm run start
   ```

6. Open the web dashboard: Navigate to http://localhost:3000 in your browser.

---

### Usage

1. Start the webcam on a device running the frontend.
2. The system will automatically detect intruders using COCO-SSD.
3. When an intruder is detected, the system will start recording video.
4. The video will be uploaded to the web dashboard, where it can be viewed.
5. The system will also send real-time notifications during detection.

---

### Known Issues

- Performance on Low-End Devices: Due to COCO-SSD's real-time processing, devices with low computational power may experience lag.
- Video Upload Size: Large video files may take longer to upload, especially on slower networks.
- Browser Compatibility: Some browsers may not fully support the Media Recorder API.
- Cannot access via mobile: Try to follow the steps given here https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device

---

### Contributing

We welcome contributions to enhance the functionality of Watch Dog. Please follow the guidelines below:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a detailed explanation of your changes.

---

### License

This project is licensed under the MIT License.
