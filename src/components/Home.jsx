import { useEffect, useState } from 'react'
import './Home.css'
import AveragesComponent from './AveragesComponent/index';
import MoodSleepTrends from './MoodSleepTrends/index';
import MoodForm  from './MoodForm/index';

import logo from '../assets/images/logo.svg'
import avatar from '../assets/images/avatar-lisa.jpg' /* Temporalmente hasta por una imagen por defecto */
import defaultProfile from '../assets/images/avatar-placeholder.svg' /* Imagen de Perfil Por Defecto */
import dropDownArrow from '../assets/images/icon-dropdown-arrow.svg';
import { TodaysMood } from './TodaysMood/index';
import { INITIAL_MOOD_REGISTERS } from '../constants/mockData';

export const Home = () => {
    
    const [data, setData] = useState(null);
    const [user, setUser] = useState({name: "Lisa Mairi"});

    const [moodRegisters, setMoodRegisters] = useState(INITIAL_MOOD_REGISTERS);

    const {name} = user;

    useEffect(() => {
        const dataFromLS = localStorage.getItem("moodRegisters");
        if (dataFromLS) {
            setMoodRegisters(JSON.parse(dataFromLS));
        } else {
            setMoodRegisters(INITIAL_MOOD_REGISTERS);
        }
    }, []);

    useEffect(() => {
        if(moodRegisters.length > 0 && moodRegisters[moodRegisters.length - 1].date === new Date().toISOString().split('T')[0]){
            setData(moodRegisters[moodRegisters.length - 1]);
        } else {
            setData(null);
        }
    }, [moodRegisters]);

    // Logica del Modal
    const [showModal, setShowModal] =  useState(false) ;

    const openModal = () => setShowModal(true);

    const closeModal = () => setShowModal(false);

    
    // TODO: Que el dia de la semana venga en Cardinal, es decir con el TH o RD, o lo que venga
    const date = new Date();
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

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
                    <img src={dropDownArrow} alt="Arrow" className='head-arrow' />
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

        <MoodForm showModal={showModal} setData={setData} moodRegisters={moodRegisters} setMoodRegisters={setMoodRegisters} closeModal={closeModal} />
  
    </>
  )
}
