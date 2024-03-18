import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { Link} from 'react-router-dom';
import yourImage from "./register.jpg";

// Initialize Firebase with your configuration
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
const storage = getStorage(app);

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!validatePassword()) {
      return;
    }
    setValid(true);

    // Create registration details string
    const registrationDetails = `Name: ${name}\nEmail: ${email}\nPassword: ${password}`;
    console.log(name);
    try {
      // Upload registration details as a text file to Firebase Storage
      await uploadRegistrationDetails(registrationDetails);
      
    } catch (error) {
      console.error('Error uploading registration details:', error);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
        setShowPassword(!showPassword);
    } else if (field === 'confirm_password') {
        setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const uploadRegistrationDetails = async (details) => {
    // Create a unique filename
    const filename = `${name}_registration_details.txt`;
  
    // Upload the registration details to Firebase Storage
    const storageRef = ref(storage, `${name}/${filename}`);
    await uploadString(storageRef, details);
  };

  return (
    <div style={{ backgroundImage: `url(${yourImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="container bg-dark border border-info p-4">
        <h2 className="text-info text-center mb-4">Registration Details</h2>
        <form>
          <div className="row mb-3">
            <label htmlFor="name" className="form-label col-md-2 text-info">Name:</label>
            <div className="col-md-10">
              <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
    
          <div className="row mb-3">
            <label htmlFor="email" className="form-label col-md-2 text-info">Email:</label>
            <div className="col-md-10">
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
    
          <div className="row mb-3">
            <label htmlFor="password" className="form-label col-md-2 text-info">Password:</label>
            <div className="col-md-10">
              <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input type="checkbox" onClick={() => togglePasswordVisibility('password')} className="mt-2" /> <span className="text-info">Show content</span>
            </div>
          </div>
    
          <div className="row mb-3">
            <label htmlFor="confirm_password" className="form-label col-md-2 text-info">Confirm Password:</label>
            <div className="col-md-10">
              <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirm_password" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <input type="checkbox" onClick={() => togglePasswordVisibility('confirm_password')} className="mt-2" /><span className="text-info"> Show content</span>
            </div>
          </div>
    
          <div className="row justify-content-center">
            {!valid && <button className="btn btn-primary" onClick={handleSubmit}>Check</button>}
            {valid && <Link type="button" className="btn btn-primary" to={`/image_capture/${name}`}>Register</Link>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
