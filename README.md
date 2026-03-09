# Gesture Control

Control your computer with hand gestures using real-time webcam-based hand tracking. Move the cursor, click, scroll, and adjust system brightness and volume — all without touching your mouse or keyboard.

Built with MediaPipe for hand detection, FastAPI for the backend, and React for the frontend dashboard.

## Features

- **Cursor Control** — Move and click the mouse with hand gestures
- **Drag & Drop** — Grab and drag with a fist gesture
- **Scroll** — Vertical and horizontal scrolling via pinch gestures
- **Brightness & Volume** — Adjust system brightness and volume with pinch movements
- **Multi-hand Support** — Detects both hands with configurable dominant hand
- **Stabilized Tracking** — Kalman filtering and frame stabilization reduce jitter

## Gesture Reference

| Gesture | Action |
|---|---|
| V Sign (dominant hand) | Activate cursor mode |
| Fist (dominant hand) | Drag / grab |
| Middle finger (in cursor mode) | Left click |
| Index finger (in cursor mode) | Right click |
| Two fingers closed (in cursor mode) | Double click |
| Pinch (non-dominant hand) | Scroll (Y-axis) and horizontal scroll (X-axis) |
| Pinch (dominant hand) | Brightness (X-axis) and volume (Y-axis) |

## Tech Stack

**Backend:** Python, FastAPI, MediaPipe, OpenCV, PyAutoGUI, pycaw, screen-brightness-control

**Frontend:** React 19, Vite, Tailwind CSS, Axios

## Prerequisites

- Python 3.8+
- Node.js 18+
- A webcam
- Windows OS (uses Windows-specific APIs for audio/brightness control)

## Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Usage

Start both the backend and frontend:

```bash
# Terminal 1 — Backend (runs on http://localhost:8000)
cd backend
python main.py

# Terminal 2 — Frontend (runs on http://localhost:5173)
cd frontend
npm run dev
```

Open the frontend in your browser to configure the dominant hand and start/stop gesture recognition.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/start` | Start gesture recognition |
| `POST` | `/stop` | Stop gesture recognition |
| `GET` | `/status` | Get system status (`{"running": true/false}`) |
| `POST` | `/set_dominant_hand` | Set dominant hand (`{"dominant_hand": "left"}`) |

## Project Structure

```
gesture_control/
├── backend/
│   ├── main.py                  # FastAPI server
│   ├── gesture_controller.py    # Main controller orchestrating the system
│   ├── gesture_recognition.py   # Hand landmark detection and gesture classification
│   ├── controller.py            # Mouse, brightness, and volume control
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       └── GestureControl.jsx   # Dashboard UI
│   ├── package.json
│   └── vite.config.js
└── gesture.py                   # Standalone gesture module (reference)
```

## How It Works

1. **Capture** — Webcam frames are processed in real time
2. **Detect** — MediaPipe identifies up to 2 hands and extracts 21 landmarks per hand
3. **Classify** — Finger states are encoded as a 5-bit binary value to identify gestures, with 4-frame stabilization to filter noise
4. **Execute** — Recognized gestures are mapped to system actions (cursor movement, clicks, brightness/volume adjustments)

## License

This project is for educational and personal use.
