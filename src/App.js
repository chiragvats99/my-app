import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Navbar from './frontend_components/Navbar';
import Register from './frontend_components/Register';
import Image_capture from './frontend_components/Image_capture';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path ='/' element ={<><Navbar></Navbar><Register></Register></>}></Route>
        <Route exact path ='/image_capture' element ={<><Navbar></Navbar><Image_capture></Image_capture></>}></Route>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
