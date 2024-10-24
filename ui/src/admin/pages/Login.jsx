import { useState } from 'react'
import './css/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state)=> state.user);


  const handleClick = (e) => {
    console.log("Button clicked");
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    login(dispatch, { email, password });
  };
 
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className='login-video-wrapper'>
          <video className='login-video' playsInline preload="metadata" crossOrigin="anonymous" title="mustadwebsitebanner1" autoPlay muted loop poster="https://i.vimeocdn.com/video/1881932449-d561faee761eae2a1d0e44a85e1d6f17fb28232786c41853c8a6458dd32f87ba-d_1920x1080?r=pad">
            <source src='https://player.vimeo.com/external/968691145.m3u8?s=ad762a6c9e197eb5d4b568d6937450da6d720c9d&oauth2_token_id=1377975833' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='login-info'>
          <h1 className="login-title">SIGN IN</h1>
          <form className='login-form'>
            <div className='login-label'>
              <label htmlFor="EMAIL" className="login-form-label">Email<span className="required">*</span></label>
              <input className="login-input" id='EMAIL' name='Email' type="email" placeholder="Enter your email" required autoComplete="email"  onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='login-label'>
              <label htmlFor="PASSWORD" className="login-form-label">Password<span className="required">*</span></label>
              <input className="login-input" id='PASSWORD' name='Password' type="password" placeholder="Enter your password"  required autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="login-button" onClick={handleClick} disabled={isFetching}>LOGIN</button>
            {error && <span className="login-error">Something went wrong...</span>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
