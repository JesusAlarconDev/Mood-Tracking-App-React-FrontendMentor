import {useState} from 'react'
import {useAuth} from '../../context/AuthContext'
import defaultProfile from '../../assets/images/avatar-placeholder.svg'
import './index.css'

const SettingsModal = ({isOpen, onClose}) => {
  const {user} = useAuth();
  const {name: userName, email: userEmail} = user || {};

  const [formData, setFormData] = useState({
    name: userName || '',
    email: userEmail || '',
    profileImage: defaultProfile
  })

  const {name, email, profileImage} = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission when Api Backend is Ready
    console.log('Form submitted:', formData);
  };

  if (!isOpen) return null; 
  
  return (
    <div className='settings-overlay'> 
      <div className='settings-container'>
        <h3 className='settings-title'>Update your profile</h3>
        <p className='settings-subtitle'>Personalize your account with your name and photo.</p>

        <span onClick={onClose} className='settings-close'>x</span>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='settings-form-group'>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className='settings-form-input'
              />
          </div>
          <div className='settings-form-group'>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className='settings-form-input'
              />
          </div>
          <div className='settings-profile-container'>
              <img src={profileImage} alt="profile image" />
              <div className='settings-upload-info'>
                  <label htmlFor="name" className='auth-form-label'>Upload Image</label>
                  <p>Max 250KB, PNG o JPEG</p>
                  <button type="button">Upload</button>
              </div>
          </div>

          <button type="submit" className='settings-submit'>Submit changes</button>
        </form>
      </div>
    </div>
    )
}

export default SettingsModal