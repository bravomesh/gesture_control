from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from threading import Thread
from gesture_controller import GestureController

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

gesture_controller_thread = None
gesture_controller_running = False

gc = GestureController()

class DominantHandRequest(BaseModel):
    dominant_hand: str

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

@app.post("/set_dominant_hand")
async def set_dominant_hand(request: DominantHandRequest):
    try:
        gc.set_dominant_hand(request.dominant_hand)
        return {"status": f"Dominant hand set to {request.dominant_hand}"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))



@app.get("/status")
async def get_status():
    global gesture_controller_running
    return {"running": gesture_controller_running}
