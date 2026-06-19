import React, {useState} from 'react'
import '../../Auth/index.css'
import logo from '../../../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Loading from '../../Loading';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const {email, password} = formData;
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const LOGIN_URL = '/api/users/login'; 

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    email: email,
                    password: password,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el inicio de sesión');
            }
    
            const data = await response.json();
            const jwtToken = data.token; 
            const userInfo = data.user;

            if (jwtToken) {
                loginWithToken(jwtToken, userInfo);
                navigate('/');
            } else {
                throw new Error('El servidor no retornó un token.');
            }
    
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
    <>
        <div className='auth-container'>
            <img src={logo} alt="logo" className='logo'/>
            
            <div className='auth-form'>
                <h3 className='auth-form-title'>Welcome back!</h3>
                <p className='auth-form-description'>Log in to continue tracking your mood and sleep.</p>

                <form onSubmit={handleSubmit}>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                    <div className='auth-form-group'>
                        <label htmlFor="email" className='auth-form-label'>Email Address</label>
                        <input 
                            type="email" 
                            placeholder='name@mail.com' 
                            id="email" 
                            className='auth-form-input' 
                            value={email}
                            onChange={(e) => setFormData({
                                ...formData,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className='auth-form-group'>
                        <label htmlFor="password" className='auth-form-label'>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className='auth-form-input' 
                            value={password}
                            onChange={(e) => setFormData({
                                ...formData,
                                password: e.target.value
                            })}
                        />
                    </div>
                    </>
                )}


                    {error && (
                        <ul className='auth-form-error'>
                            <li>
                                <p>{error}</p>
                            </li>
                        </ul>
                    )}
                    
                    <button type='submit' className='auth-form-button' disabled={loading}>
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                    </form>

                <p className='auth-form-footer'>Haven't got an account? <Link to="/signup" className='auth-form-footer-link'>Sign up</Link></p>
            </div>
        </div>
    </>
  )
}

export default Login