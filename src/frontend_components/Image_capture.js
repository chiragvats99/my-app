import React, { useRef, useEffect } from 'react';
import yourImage from "./register.jpg";

function ImageCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => console.error('Error accessing camera:', error));
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the image to a data URL
    const imageData = canvas.toDataURL('image/png');

    // Create a link element
    const link = document.createElement('a');
    link.href = imageData;

    // Set the file name for the downloaded image
    link.download = 'captured_image.png';

    // Simulate a click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let requestId;

    const drawFrame = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestId = requestAnimationFrame(drawFrame);
    };

    const startDrawing = () => {
      if (video.srcObject) {
        video.play();
        drawFrame();
      }
    };

    startDrawing();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div>
      <div style={{ backgroundImage: `url(${yourImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="container-xl text-info bg-dark border border-info">Click on "Start Camera" to start your camera
      <div>
        <button className="btn bg-dark text-info border border-info" onClick={captureImage}>Capture Image</button>
        <video ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef} width={400} height={300} style={{ width: '100%', maxWidth: '400px', height: 'auto', display:"flex" }}></canvas>
        <button className="btn bg-dark text-info border border-info" onClick={startCamera}>Start Camera</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ImageCapture;
