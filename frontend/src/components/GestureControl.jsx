import React from 'react';
import axios from 'axios';

const GestureControl = () => {
  const startGestureController = () => {
    axios.post('http://localhost:8000/start')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error starting the gesture controller!', error);
      });
  };

  const stopGestureController = () => {
    axios.post('http://localhost:8000/stop')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error stopping the gesture controller!', error);
      });
  };

  return (
    <div>
      <button onClick={startGestureController}>Start</button>
      <button onClick={stopGestureController}>Stop</button>
    </div>
  );
};

export default GestureControl;
