import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestureControl = () => {
  const [dominantHand, setDominantHand] = useState('right');
  const [status, setStatus] = useState('unknown');

  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus();
    }, 1000); // Check status every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const checkStatus = () => {
    axios.get('http://localhost:8000/status')
      .then(response => {
        setStatus(response.data.running ? 'running' : 'stopped');
      })
      .catch(error => {
        console.error('There was an error checking the status!', error);
      });
  };

  const startGestureController = () => {
    axios.post('http://localhost:8000/start')
      .then(response => {
        console.log(response.data);
        checkStatus();
      })
      .catch(error => {
        console.error('There was an error starting the gesture controller!', error);
      });
  };

  const stopGestureController = () => {
    axios.post('http://localhost:8000/stop')
      .then(response => {
        console.log(response.data);
        checkStatus();
      })
      .catch(error => {
        console.error('There was an error stopping the gesture controller!', error);
      });
  };

  const setDominantHandHandler = () => {
    axios.post('http://localhost:8000/set_dominant_hand', { dominant_hand: dominantHand })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error setting the dominant hand!', error);
      });
  };

  return (
    <div>
      <div>
        <label>
          Dominant Hand:
          <select value={dominantHand} onChange={(e) => setDominantHand(e.target.value)}>
            <option value="right">Right</option>
            <option value="left">Left</option>
          </select>
        </label>
        <button onClick={setDominantHandHandler}>Set Dominant Hand</button>
      </div>
      <div>
        <p>Status: {status}</p>
        <button onClick={startGestureController}>Start</button>
        <button onClick={stopGestureController}>Stop</button>
      </div>
      <div>
        <button style={{ backgroundColor: status === 'running' ? 'green' : 'red' }}>
         System Status: {status === 'running' ? 'Running' : 'Stopped'}
        </button>
      </div>
    </div>
  );
};

export default GestureControl;