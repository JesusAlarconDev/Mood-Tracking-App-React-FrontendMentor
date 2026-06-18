import { useEffect, useState } from 'react'
import './Home.css'
import AveragesComponent from './AveragesComponent/index';
import MoodSleepTrends from './MoodSleepTrends/index';
import MoodForm  from './MoodForm/index';

import logo from '../assets/images/logo.svg'
import avatar from '../assets/images/avatar-lisa.jpg' /* Temporalmente hasta por una imagen por defecto */
import defaultProfile from '../assets/images/avatar-placeholder.svg' /* Imagen de Perfil Por Defecto */
import dropDownArrow from '../assets/images/icon-dropdown-arrow.svg';
import settingsIcon from '../assets/images/icon-settings.svg';
import logoutIcon from '../assets/images/icon-logout.svg';
import { TodaysMood } from './TodaysMood/index';
import { INITIAL_MOOD_REGISTERS } from '../constants/mockData';
import { useAuth } from '../context/AuthContext';
import SettingsModal from './SettingsModal';

export const Home = () => {
    
    const [data, setData] = useState(null);
    const [moodRegisters, setMoodRegisters] = useState(INITIAL_MOOD_REGISTERS);

    const { user, logout } = useAuth();
    const name = user?.name || "User";
    const email = user?.email || "";

    useEffect(() => {
        const fetchMoodRegisters = async () => {
            try {
                const jwt_token = localStorage.getItem('userToken');
                if (!jwt_token) {
                    throw new Error('No autorizado. Por favor inicia sesión.');
                }

                const url = '/api/moods';
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al cargar los registros de humor');
                }

                const data = await response.json();
                setMoodRegisters(Array.isArray(data.moods) ? data.moods : []);
            } catch (err) {
                console.error(err.message);
            }
            //  finally {
            //     setLoading(false);
            // }
        };

        fetchMoodRegisters();
    }, []);

    useEffect(() => {
        if(moodRegisters.length > 0){
            const lastRegister = moodRegisters[moodRegisters.length - 1];
            const today = new Date().toISOString().split('T')[0];
            const registerDate = new Date(lastRegister.createdAt).toISOString().split('T')[0];
            if(registerDate === today){
                setData(lastRegister);
            } else {
                setData(null);
            }
        } else {
            setData(null);
        }
    }, [moodRegisters]);

    // Logica del Modal
    const [showModal, setShowModal] =  useState(false) ;

    const openModal = () => setShowModal(true);

    const closeModal = () => setShowModal(false);

    // Logica del User Menu
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    
    // TODO: Que el dia de la semana venga en Cardinal, es decir con el TH o RD, o lo que venga
    const date = new Date();
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    // Logica del Settings Modal
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const openSettings = () => setIsSettingsOpen(true);
    const closeSettings = () => setIsSettingsOpen(false);

  return (
    <>
        <header>
            <div className='head'>
                <div className='head-logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='head-user'>
                    {/* User */}
                    {/* Comprobacion de si hay una imagen de perfil muestra la imagen y si no el default */}
                    {/* <img src={avatar} alt="Avatar" /> */}
                    <img src={defaultProfile} alt="Avatar" className='head-avatar' />
                    <img 
                        src={dropDownArrow} 
                        alt="Arrow" 
                        className={`head-arrow ${isUserMenuOpen ? 'head-arrow-rotated' : ''}`} 
                        onClick={toggleUserMenu}
                    />

                    <div className={`user-menu ${isUserMenuOpen ? 'user-menu-open' : ''}`}>
                        <p className='user-menu-name'>{name}</p>
                        <p className='user-menu-email'>{email}</p>
                        <p className='user-menu-settings' onClick={() => openSettings()}><img src={settingsIcon} alt="Settings"/> Settings</p>
                        <p className='user-menu-logout' onClick={() => handleLogout()}><img src={logoutIcon} alt="Logout" /> Logout</p>
                    </div>
                </div>
            </div>
            <h2 className='header-greeting'> Hello, {name}!</h2>
        
            <h2 className='header-question'>How are you feeling today?</h2> 
            <p className='header-date'>{formatDate(date)}</p>

            {/* Para desarrollo tendre el boton siempre operativo */}
            {/* <button className='header-button' onClick={() => openModal()}>Log today's mood</button> */}

            {/* Si ya ha cargado su estado de animo de hoy */}
            {data? (
                <TodaysMood data={data} />
            ): (
                <button className='header-button' onClick={() => openModal()}>Log today's mood</button>
            )}

        </header>

        <main className='main'>
            <AveragesComponent last10Registers={moodRegisters}/>
            <MoodSleepTrends moodRegisters={moodRegisters} />
        </main>

        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
        <MoodForm showModal={showModal} setData={setData} moodRegisters={moodRegisters} setMoodRegisters={setMoodRegisters} closeModal={closeModal} />
  
    </>
  )
}
