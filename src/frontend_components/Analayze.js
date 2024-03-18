import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

function Analyze() {
  return (
    <div>
      <video id="video" autoPlay muted></video>
      <canvas id="canvas" width="640" height="480"></canvas>
    </div>
  );
}

export default Analyze;
