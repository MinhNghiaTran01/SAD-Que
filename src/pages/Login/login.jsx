import React, { useState } from 'react';
import { sendUser } from '../../services/loginService';
import { useNavigate, useNavigation } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (res) => {
      const token = res.data.accessToken; 
      localStorage.setItem('token', token);
      const refreshToken = res.data.refreshToken; 
      localStorage.setItem('refreshToken', refreshToken);
      setIsLoggedIn(true); 
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const fetch = async () => {
          const res = await sendUser({
            username: username,
            password: password
          },'api/login')

          if(res.status===201){
            handleLogin(res)
            navigate('/home'); 
          }
          else{
            console.log(res.message)
          }
        }
        fetch()
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <form onSubmit={handleSubmit} style={{ padding: '20px', borderRadius: '5px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)', backgroundColor: '#fff' }}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    required
                />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
