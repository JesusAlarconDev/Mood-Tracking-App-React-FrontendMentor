import {useState} from 'react'
import {useAuth} from '../../context/AuthContext'
import defaultProfile from '../../assets/images/avatar-placeholder.svg'
import './index.css'

const SettingsModal = ({isOpen, onClose}) => {
  const {user, updateUser} = useAuth();
  const {name: userName, email: userEmail, profilePicture} = user || {};

  const [formData, setFormData] = useState({
    name: userName || '',
    email: userEmail || '',
    profileImage: profilePicture || defaultProfile,
    profilePictureFile: null
  })

  const {name, email, profileImage, profilePictureFile} = formData;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamaño (250KB max)
    if (file.size > 250 * 1024) {
      alert('La imagen excede el tamaño máximo de 250KB');
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Solo se permiten archivos PNG o JPEG');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profileImage: reader.result,
        profilePictureFile: file
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwt_token = localStorage.getItem('userToken');
      if (!jwt_token) {
          throw new Error('No autorizado. Por favor inicia sesión.');
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);

      if (profilePictureFile) {
        formDataToSend.append('profilePicture', profilePictureFile);
      }
    
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${jwt_token}`
        },
        body: formDataToSend
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }
      
      const result = await response.json();
      
      const updatedUser = {
        ...user,
        name: name,
        email: email,
        profilePicture: result.data?.profilePicture || profilePicture
      };
      updateUser(updatedUser);
      
      onClose();

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil. Por favor intenta nuevamente.');
    }
  };

  if (!isOpen) return null; 
  
  return (
    <div className='settings-overlay'> 
      <div className='settings-container'>
        <h3 className='settings-title'>Update your profile</h3>
        <p className='settings-subtitle'>Personalize your account with your name and photo.</p>

        <span onClick={onClose} className='settings-close'>x</span>

        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
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
              <img src={profileImage ? profileImage : defaultProfile} alt="profile image" />
              <div className='settings-upload-info'>
                  <label htmlFor="name" className='auth-form-label'>Upload Image</label>
                  <p>Max 250KB, PNG o JPEG</p>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    name="profilePicture"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="profilePictureInput"
                  />
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('profilePictureInput').click()}
                  >
                    Upload
                  </button>
              </div>
          </div>

          <button type="submit" className='settings-submit'>Submit changes</button>
        </form>
      </div>
    </div>
    )
}

export default SettingsModal