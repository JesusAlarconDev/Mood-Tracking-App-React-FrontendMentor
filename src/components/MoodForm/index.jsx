import { useState } from 'react'
import veryHappy from '../../assets/images/icon-very-happy-color.svg'
import happy from '../../assets/images/icon-happy-color.svg'
import neutral from '../../assets/images/icon-neutral-color.svg'
import sad from '../../assets/images/icon-sad-color.svg'
import verySad from '../../assets/images/icon-very-sad-color.svg'
import Loading from '../Loading'
import './index.css';

const MoodForm = ({showModal, closeModal}) => {
    const initialState = {todaysMood: "", feelings: [], aboutYourDay: "", sleepHours: "", createdAt: new Date().toISOString()};

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialState);
    const [stepErrors, setStepErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const validateStep = (step, data) => {
        switch(step){
            case 1: {
                if (!data.todaysMood) return ['Please select a mood before continuing.'];
                return [];
            }
            case 2: {
                if (!data.feelings || data.feelings.length < 1) return ['You have to select at least 1 tag.'];
                if (data.feelings.length > 3) return ['You can only select a maximum of 3 tags.'];
                return [];
            }
            case 3: {
                const text = (data.aboutYourDay ?? '').trim();
                if (!text) return ['Please write a few words about your day before continuing.'];
                if (text.length > 150) return ['You exceeded the maximum number of characters (150)'];
                return [];
            }
            case 4: {
                if (!data.sleepHours) return ['Please select how many hours did you sleep before continuing.'];
                return [];
            }
            default:
                return [];
        }
    };

    const handleOnChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => {
                if (prev.feelings.includes(value)) {
                    const next = {
                        ...prev,
                        feelings: prev.feelings.filter(feeling => feeling !== value)
                    };
                    if (stepErrors.length > 0) setStepErrors(validateStep(currentStep, next));
                    return next;
                }
                if (prev.feelings.length < 3) {
                    const next = {
                        ...prev,
                        feelings: [...prev.feelings, value]
                    };
                    if (stepErrors.length > 0) setStepErrors(validateStep(currentStep, next));
                    return next;
                }
                if (stepErrors.length > 0) setStepErrors(validateStep(currentStep, prev));
                return prev;
            });
        } else {
            const next = { ...formData, [name]: value };
            setFormData(next);
            // Si ya había errores en el paso actual, revalida en vivo para permitir avanzar apenas se corrija.
            if (stepErrors.length > 0) setStepErrors(validateStep(currentStep, next));
        }
    }

    const handleCloseModal = () => {
        setCurrentStep(1);
        setFormData(initialState); // Resetea el formulario
        closeModal();
    };

    if(!showModal){
        return null;
    }

    const nextStep = (e) => {
        if (e) e.preventDefault();
        const errors = validateStep(currentStep, formData);
        if (errors.length > 0) {
            setStepErrors(errors);
            return;
        }
        setStepErrors([]);
        setCurrentStep(prevStep => prevStep + 1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const errors = validateStep(4, formData);
        if (errors.length > 0) {
            setStepErrors(errors);
            return;
        }
        setStepErrors([]);

        try {
            const jwt_token = localStorage.getItem('userToken');
            if (!jwt_token) {
                throw new Error('No autorizado. Por favor inicia sesión.');
            }
            const url = '/api/moods';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al crear el registro');
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }

        setCurrentStep(1); 
        setFormData(initialState); 
        closeModal(); 
    }

    const renderStep = () => {
        switch(currentStep){
            case 1:
                return (
                    <>
                        {/* Pagina 1 */}
                        <h3>How was your mood today?</h3>

                        <label className='form-radio'>
                            <input type="radio" name="todaysMood" value="Very Happy" checked={formData.todaysMood === "Very Happy"} onChange={handleOnChange}/>
                            <span>Very Happy</span>
                            <img src={veryHappy} alt="Very Happy" />
                        </label>

                        <label className='form-radio'>
                            <input type="radio" name="todaysMood" value="Happy" checked={formData.todaysMood === "Happy"} onChange={handleOnChange}/>
                            <span>Happy</span>
                            <img src={happy} alt="Happy" />
                        </label>

                        <label className='form-radio'>
                            <input type="radio" name="todaysMood" value="Neutral" checked={formData.todaysMood === "Neutral"} onChange={handleOnChange}/>
                            <span>Neutral</span>
                            <img src={neutral} alt="Neutral" />
                        </label>

                        <label className='form-radio'>
                            <input type="radio" name="todaysMood" value="Sad" checked={formData.todaysMood === "Sad"} onChange={handleOnChange}/>
                            <span>Sad</span>
                            <img src={sad} alt="Sad" />
                        </label>

                        <label className='form-radio'>
                            <input type="radio" name="todaysMood" value="Very Sad" checked={formData.todaysMood === "Very Sad"} onChange={handleOnChange}/>
                            <span>Very Sad</span>
                            <img src={verySad} alt="Very Sad" />
                        </label>

                        {stepErrors.length > 0 && (
                            <div className="form-error" role="alert">
                                <ul>
                                    {stepErrors.map((err) => <li key={err}>{err}</li>)}
                                </ul>
                            </div>
                        )}

                        <button type="button" onClick={nextStep}>
                            Continue
                        </button>
                    </>
                );
            case 2:
                return (
                    <>
                        {/* Pagina 2  */}
                        <h3>How did you feel?</h3>
                        <span className='text-preset-6'>Select up to three tags:</span>

                        <div className='page-two'>
                            <div className='form-check'>  
                                <input type="checkbox" id="Joyful" name="feelings" value="Joyful" checked={formData.feelings.includes('Joyful')} onChange={handleOnChange}/>
                                <label htmlFor="Joyful">Joyful</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Down" name="feelings" value="Down" checked={formData.feelings.includes('Down')} onChange={handleOnChange}/>
                                <label htmlFor="Down">Down</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Anxious" name="feelings" value="Anxious" checked={formData.feelings.includes('Anxious')} onChange={handleOnChange}/>
                                <label htmlFor="Anxious">Anxious</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Calm" name="feelings" value="Calm" checked={formData.feelings.includes('Calm')} onChange={handleOnChange}/>
                                <label htmlFor="Calm">Calm</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Excited" name="feelings" value="Excited" checked={formData.feelings.includes('Excited')} onChange={handleOnChange}/>
                                <label htmlFor="Excited">Excited</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Frustrated" name="feelings" value="Frustrated" checked={formData.feelings.includes('Frustrated')} onChange={handleOnChange}/>
                                <label htmlFor="Frustrated">Frustrated</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Lonely" name="feelings" value="Lonely" checked={formData.feelings.includes('Lonely')} onChange={handleOnChange}/>
                                <label htmlFor="Lonely">Lonely</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Grateful" name="feelings" value="Grateful" checked={formData.feelings.includes('Grateful')} onChange={handleOnChange}/>
                                <label htmlFor="Grateful">Grateful</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Overwhelmed" name="feelings" value="Overwhelmed" checked={formData.feelings.includes('Overwhelmed')} onChange={handleOnChange}/>
                                <label htmlFor="Overwhelmed">Overwhelmed</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Motivated" name="feelings" value="Motivated" checked={formData.feelings.includes('Motivated')} onChange={handleOnChange}/>
                                <label htmlFor="Motivated">Motivated</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Irritable" name="feelings" value="Irritable" checked={formData.feelings.includes('Irritable')} onChange={handleOnChange}/>
                                <label htmlFor="Irritable">Irritable</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Peaceful" name="feelings" value="Peaceful" checked={formData.feelings.includes('Peaceful')} onChange={handleOnChange}/>
                                <label htmlFor="Peaceful">Peaceful</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Tired" name="feelings" value="Tired" checked={formData.feelings.includes('Tired')} onChange={handleOnChange}/>
                                <label htmlFor="Tired">Tired</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Hopeful" name="feelings" value="Hopeful" checked={formData.feelings.includes('Hopeful')} onChange={handleOnChange}/>
                                <label htmlFor="Hopeful">Hopeful</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Confident" name="feelings" value="Confident" checked={formData.feelings.includes('Confident')} onChange={handleOnChange}/>
                                <label htmlFor="Confident">Confident</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Stressed" name="feelings" value="Stressed" checked={formData.feelings.includes('Stressed')} onChange={handleOnChange}/>
                                <label htmlFor="Stressed">Stressed</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Content" name="feelings" value="Content" checked={formData.feelings.includes('Content')} onChange={handleOnChange}/>
                                <label htmlFor="Content">Content</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Disappointed" name="feelings" value="Disappointed" checked={formData.feelings.includes('Disappointed')} onChange={handleOnChange}/>
                                <label htmlFor="Disappointed">Disappointed</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Optimistic" name="feelings" value="Optimistic" checked={formData.feelings.includes('Optimistic')} onChange={handleOnChange}/>
                                <label htmlFor="Optimistic">Optimistic</label><br/>
                            </div>

                            <div className='form-check'>
                                <input type="checkbox" id="Restless" name="feelings" value="Restless" checked={formData.feelings.includes('Restless')} onChange={handleOnChange}/>
                                <label htmlFor="Restless">Restless</label><br/>
                            </div>

                        </div>

                        {stepErrors.length > 0 && (
                            <div className="form-error" role="alert">
                                <ul>
                                    {stepErrors.map((err) => <li key={err}>{err}</li>)}
                                </ul>
                            </div>
                        )}

                        <button type="button" onClick={nextStep}>
                            Continue
                        </button>
                    </>
                )
            case 3:
                return (
                    <>
                        {/* Pagina 3 */}
                        <h3>Write about your day...</h3>

                        <textarea
                            onChange={handleOnChange}
                            className='text-area'
                            name="aboutYourDay"
                            value={formData.aboutYourDay}
                            maxLength={150}
                            placeholder='Today, I felt...'
                        />
                        <span className='text-area-count'>{formData.aboutYourDay.length}/150</span>

                        {stepErrors.length > 0 && (
                            <div className="form-error" role="alert">
                                <ul>
                                    {stepErrors.map((err) => <li key={err}>{err}</li>)}
                                </ul>
                            </div>
                        )}

                        <button type="button" onClick={nextStep}>
                            Continue
                        </button>
                    </>
                );
            case 4:
                return (
                    <>
                        {loading ? (<Loading />) : (
                        <>
                            <h3>How many hours did you sleep last night?</h3>

                            <label className="form-radio">
                                <input type="radio" name="sleepHours" value="9+" checked={formData.sleepHours === "9+"} onChange={handleOnChange}/>
                                <span>9+ hours</span>
                            </label>

                            <label className="form-radio">
                                <input type="radio" name="sleepHours" value="7-8" checked={formData.sleepHours === "7-8"} onChange={handleOnChange}/>
                                <span>7-8 hours</span>
                            </label>

                            <label className="form-radio">
                                <input type="radio" name="sleepHours" value="5-6" checked={formData.sleepHours === "5-6"} onChange={handleOnChange}/>
                                <span>5-6 hours</span>
                            </label>

                            <label className="form-radio">
                                <input type="radio" name="sleepHours" value="3-4" checked={formData.sleepHours === "3-4"} onChange={handleOnChange}/>
                                <span>3-4 hours</span>
                            </label>

                            <label className="form-radio">
                                <input type="radio" name="sleepHours" value="0-2" checked={formData.sleepHours === "0-2"} onChange={handleOnChange}/>
                                <span>0-2 hours</span>
                            </label>
                        </>
                        )}

                        {stepErrors.length > 0 && (
                            <div className="form-error" role="alert">
                                <ul>
                                    {stepErrors.map((err) => <li key={err}>{err}</li>)}
                                </ul>
                            </div>
                        )}

                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </>
                );
        }

    }

    return (
        <div className='modal-overlay'>
            <form className='form-modal' onSubmit={handleSubmit}>

                <span onClick={handleCloseModal} className='modal-close-button'>x</span>

                <h2>Log your mood</h2>


                <div className="progress-bar">
                    {[1, 2, 3, 4].map((step) => (
                        <div 
                            key={step}
                            className={`segment ${
                                currentStep === step 
                                    ? 'active' 
                                    : ''
                            }`}
                        />
                    ))}
                </div>

                {renderStep()}
            </form>
        </div>
    )
}

export default MoodForm;