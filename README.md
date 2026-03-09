<div align="center">

# Gesture Control

**Control your computer with hand gestures — no mouse or keyboard needed.**

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-0.10-4285F4?logo=google&logoColor=white)](https://mediapipe.dev)
[![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows&logoColor=white)]()

---

Real-time webcam-based hand tracking that lets you move the cursor, click, scroll,
and adjust system brightness & volume using intuitive hand gestures.

</div>

---

## Table of Contents

- [Features](#-features)
- [Gesture Reference](#-gesture-reference)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)

---

## Features

| | Feature | Description |
|---|---|---|
| **Cursor** | Mouse Control | Move and click the mouse using hand gestures |
| **Drag** | Drag & Drop | Grab and drag items with a fist gesture |
| **Scroll** | Smart Scrolling | Vertical and horizontal scrolling via pinch |
| **System** | Brightness & Volume | Adjust system settings with pinch movements |
| **Hands** | Multi-hand Support | Detects both hands with configurable dominant hand |
| **Stable** | Smooth Tracking | Kalman filtering and frame stabilization reduce jitter |

---

## Gesture Reference

> **Dominant hand** = your configured primary hand &nbsp;|&nbsp; **Non-dominant hand** = the other

| Gesture | Hand | Action |
|:---|:---|:---|
| **V Sign** | Dominant | Activate cursor mode |
| **Fist** | Dominant | Drag / grab |
| **Middle finger** | Dominant (in cursor mode) | Left click |
| **Index finger** | Dominant (in cursor mode) | Right click |
| **Two fingers closed** | Dominant (in cursor mode) | Double click |
| **Pinch** | Non-dominant | Scroll — Y-axis vertical, X-axis horizontal |
| **Pinch** | Dominant | System — X-axis brightness, Y-axis volume |

---

## Tech Stack

<table>
<tr>
<td><b>Backend</b></td>
<td>Python &bull; FastAPI &bull; MediaPipe &bull; OpenCV &bull; PyAutoGUI &bull; pycaw &bull; screen-brightness-control</td>
</tr>
<tr>
<td><b>Frontend</b></td>
<td>React 19 &bull; Vite &bull; Tailwind CSS &bull; Axios</td>
</tr>
</table>

---

## Prerequisites

- **Python** 3.8+
- **Node.js** 18+
- **Webcam** connected and accessible
- **Windows OS** (uses Windows-specific APIs for audio/brightness)

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/gesture-control.git
cd gesture-control
```

**2. Backend setup**

```bash
cd backend
pip install -r requirements.txt
```

**3. Frontend setup**

```bash
cd frontend
npm install
```

---

## Usage

Open two terminals and start both services:

```bash
# Terminal 1 — Start the backend (http://localhost:8000)
cd backend
python main.py
```

```bash
# Terminal 2 — Start the frontend (http://localhost:5173)
cd frontend
npm run dev
```

Then open the frontend in your browser to **configure the dominant hand** and **start/stop** gesture recognition.

---

## API Endpoints

| Method | Endpoint | Description | Body |
|:---|:---|:---|:---|
| `POST` | `/start` | Start gesture recognition | — |
| `POST` | `/stop` | Stop gesture recognition | — |
| `GET` | `/status` | Get system status | — |
| `POST` | `/set_dominant_hand` | Set dominant hand | `{"dominant_hand": "left"}` |

<details>
<summary><b>Example responses</b></summary>

```json
// GET /status
{ "running": true }

// POST /start
{ "status": "Gesture Controller started" }

// POST /set_dominant_hand
{ "status": "Dominant hand set to left" }
```

</details>

---

## Project Structure

```
gesture_control/
│
├── backend/
│   ├── main.py                  # FastAPI server & API routes
│   ├── gesture_controller.py    # Main controller orchestrating the system
│   ├── gesture_recognition.py   # Hand landmark detection & gesture classification
│   ├── controller.py            # Mouse, brightness & volume control
│   └── requirements.txt         # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Root React component
│   │   └── components/
│   │       └── GestureControl.jsx   # Dashboard UI
│   ├── package.json             # Node dependencies
│   └── vite.config.js           # Vite configuration
│
└── gesture.py                   # Standalone gesture module (reference)
```

---

## How It Works

```
Webcam  ──>  MediaPipe  ──>  Gesture Classifier  ──>  System Actions
  │              │                   │                       │
  │         Detects up to       5-bit binary            Cursor move
  │         2 hands with        finger encoding         Click / Drag
  │         21 landmarks        + 4-frame               Scroll
  │         per hand            stabilization           Brightness
  │                                                     Volume
```

1. **Capture** — Webcam frames are processed in real time via OpenCV
2. **Detect** — MediaPipe identifies up to 2 hands and extracts 21 landmarks each
3. **Classify** — Finger states are encoded as a 5-bit binary value; 4 consecutive frames of the same gesture are required to confirm it
4. **Execute** — Recognized gestures map to system actions with Kalman-filtered smoothing for stable cursor movement

---

<div align="center">

**Built for educational and personal use.**

</div>
