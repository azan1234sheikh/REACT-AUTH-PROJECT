import { useRef, useState, useEffect } from "react";
import axiosInstance from './api/axios';
import { useNavigate } from 'react-router-dom';
import Register from "./Register";
import Dashboard from "./Dashboard";
import bcrypt from 'bcryptjs'; // Import bcryptjs library for password hashing

const Login = () => {
  const userRef = useRef();
  const pwdRef = useRef(); // Ref for password input
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hash the password with bcryptjs

      // Send login request to server with plain text password
      const response = await axiosInstance.post(
        'http://localhost:3000/login',
        JSON.stringify({ user, pwd }), // Send plain text password to server
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    

      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      // Set success state and navigate
      setSuccess(true);
      setUser('');
      setPwd('');
      navigate('/Dashboard'); // Redirect to dashboard after successful login
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 401) {
          setErrMsg('Invalid Credentials'); // Handle invalid username/password
      } else {
          setErrMsg('Login Failed'); // Handle other login failures
      }
      errRef.current.focus();
  } 
  };

  return (
    <section>
      {success ? (
        <>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </>
      ) : (
        <>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={pwdRef} // Assign ref to password input
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Signup</button>
          </form>
          <p>
            Need an Account?<br />
            <span className="line">
              {/*put router link here*/}
              <a href="/register">Register</a>
            </span>
          </p>
        </>
      )}
    </section>
  );
}

export default Login;
