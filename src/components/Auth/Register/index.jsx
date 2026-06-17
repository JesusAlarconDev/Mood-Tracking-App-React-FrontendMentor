import React, {useState} from 'react'
import '../../Auth/index.css'
import logo from '../../../assets/images/logo.svg'
import defaultProfile from '../../../assets/images/avatar-placeholder.svg' /* Imagen de Perfil Por Defecto */
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const {email, password, name} = formData;
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleNextStep = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email y contraseña son obligatorios');
            return;
        }
        setError('');
        setCurrentStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!name) {
            setError('El nombre es obligatorio');
            setLoading(false);
            return;
        }

        const REGISTER_URL = '/api/users/register'; 

        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    email: email,
                    password: password,
                    name: name,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
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

    const renderStep = () => {
        switch(currentStep){
            case 1:
                return (
                    // Page 1
                    <>
                        <h3 className='auth-form-title'>Create an account</h3>
                        <p className='auth-form-description'>Join to track your daily mood and sleep with ease.</p>

                        <form onSubmit={handleNextStep}>
                            {error && <p className='auth-form-error'>{error}</p>}
                            <div className='auth-form-group'>
                                <label htmlFor="email" className='auth-form-label'>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder='name@mail.com' 
                                    id="email" 
                                    className='auth-form-input'
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                            </div>
                            <div className='auth-form-group'>
                                <label htmlFor="password" className='auth-form-label'>Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className='auth-form-input'
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                            </div>
                            <button type='submit' className='auth-form-button'>Sign up</button>
                        </form>

                        <p className='auth-form-footer'>Already got an account? <Link to="/login" className='auth-form-footer-link'>Log in</Link></p>
                    </>
                )
            case 2:
                return (
                    // Page 2
                    <>
                        <h3 className='auth-form-title'>Personalize your experience</h3>
                        <p className='auth-form-description'>Add your name and your profile picture to make Mood yours.</p>

                        <form onSubmit={handleSubmit}>
                            {error && <p className='auth-form-error'>{error}</p>}
                            <div className='auth-form-group'>
                                <label htmlFor="name" className='auth-form-label'>Name</label>
                                <input 
                                    type="text" 
                                    placeholder='john Doe' 
                                    id="name" 
                                    className='auth-form-input'
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                            </div>
                            <div className='auth-form-group profile-container'>
                                <img src={defaultProfile} alt="profile image" />
                                <div>
                                    <label htmlFor="name" className='auth-form-label'>Upload Image</label>
                                    <p>Max 250KB, PNG o JPEG</p>
                                    <button type="button">Upload</button>
                                </div>
                            </div>
                            <button type='submit' className='auth-form-button' disabled={loading}>
                                {loading ? 'Creating account...' : 'Start Tracking'}
                            </button>
                        </form>
                    </>
                )
            }
        };


        
  return (
    <>
        <div className='auth-container'>
            <img src={logo} alt="logo" className='logo'/>

            <div className='auth-form'>
                {renderStep()}
            </div>
        </div>
    </>
  )
}

export default Register