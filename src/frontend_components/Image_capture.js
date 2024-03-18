import { useRef, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import yourImage from "./register.jpg";

const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  projectId: "<your-project-id>",
  storageBucket: "<your-storage-bucket>",
  messagingSenderId: "<your-messaging-sender-id>",
  appId: "<your-app-id>",
  measurementId: "<your-measurement-id>"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);



function ImageCapture(props) {
  const { name } = useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => console.error('Error accessing camera:', error));
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    const filename = `captured_image_${Date.now()}.png`;

    const byteCharacters = atob(imageData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const imageBlob = new Blob([byteArray], { type: 'image/png' });

    const storageRef = ref(storage, `${name}/${filename}`);
    uploadBytes(storageRef, imageBlob).then(snapshot => {
      console.log('Image uploaded successfully');
    }).catch(error => {
      console.error('Error uploading image:', error);
    });
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
        <div className="container-xl text-info bg-dark border border-info">
          Click on "Start Camera" to start your camera
          <div>
            <button className="btn bg-dark text-info border border-info" onClick={captureImage} style={{margin:"10px"}}>Capture Image</button>
            <video ref={videoRef} autoPlay muted />
            <canvas ref={canvasRef} width={400} height={300} style={{ width: '100%', maxWidth: '400px', height: 'auto', maxHeight:"100px", display:"none", margin:"10px"}}></canvas>
            <button className="btn bg-dark text-info border border-info" onClick={startCamera} style={{margin:"10px"}}>Start Camera</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCapture;
