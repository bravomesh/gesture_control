from fastapi import FastAPI, HTTPException
from threading import Thread
from gesture_controller import GestureController

app = FastAPI()

gesture_controller_thread = None
gesture_controller_running = False

gc = GestureController()

def run_gesture_controller():
    global gc
    gc.start()

@app.post("/start")
async def start_gesture_controller():
    global gesture_controller_thread, gesture_controller_running
    if not gesture_controller_running:
        gesture_controller_thread = Thread(target=run_gesture_controller)
        gesture_controller_thread.start()
        gesture_controller_running = True
        return {"status": "Gesture Controller started"}
    else:
        raise HTTPException(status_code=400, detail="Gesture Controller already running")

@app.post("/stop")
async def stop_gesture_controller():
    global gc, gesture_controller_running
    if gesture_controller_running:
        gc.stop()
        gesture_controller_running = False
        return {"status": "Gesture Controller stopped"}
    else:
        raise HTTPException(status_code=400, detail="Gesture Controller not running")

