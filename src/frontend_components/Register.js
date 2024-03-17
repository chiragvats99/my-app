import React from 'react'
import yourImage from "./register.jpg";
import {Link} from 'react-router-dom';

function Register() {
  return (
    <div>
        <div style={{ backgroundImage: `url(${yourImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="container-md text-info bg-dark border border-info">
            <div className="align-self-center" style ={{height:"600px", width:"100px"}}>
            <div class="d-flex flex-column mb-3">
            <div class="p-2">Flex item 1</div>
                 <div class="p-2">Flex item 2</div>
                 <div class="p-2">Flex item 3</div>
                </div>
                <Link type="button" class="btn bg-light" to="/image_capture" >Register</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register