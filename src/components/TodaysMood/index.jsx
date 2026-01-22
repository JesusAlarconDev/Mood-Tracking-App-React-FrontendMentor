import quoteIcon from '../../assets/images/icon-quote.svg'
import starsIcon from '../../assets/images/icon-reflection.svg';
import sleepIcon from '../../assets/images/icon-sleep.svg'
import MoodImage from '../MoodImage/index';
import getMoodQuote from '../../utils/getMoodQuote';
import './index.css';

export const TodaysMood = ({data}) => {
    const {todaysMood, sleepHours, aboutYourDay, feelings} = data;
    
    return (
        <div className='todays-mood-container'>
            <div className='todays-mood-main'>
                <h2>I'm feeling</h2>
                <span>
                    {todaysMood}
                </span>
                <div className='todays-mood-main-footer'>
                    <div>
                        <img src={quoteIcon} alt="Quote Icon" className='quote-icon' />
                        <p className='todays-mood-quote'>{getMoodQuote(todaysMood)}</p>
                    </div>
                    <MoodImage mood={todaysMood} />
                </div>
            </div>
            
            <div className='todays-mood-main-aside'>
                <div className='todays-mood-sleep'>
                    <div>
                        <img src={sleepIcon} alt="Sleep Icon" />
                        <h2 className='text-preset-6'>Sleep</h2>
                    </div>
                    <span className='todays-mood-sleep-hours'>{sleepHours} hours</span>
                </div>
                <div  className='todays-mood-reflection'>
                    <div>
                        <img src={starsIcon} alt="Stars Icon" />
                        <h2 className='text-preset-6'>Reflection of the day</h2>
                    </div>
                    <p className='reflection'>{aboutYourDay}</p>
                    <p className='feelings'>
                        {feelings?.map(feeling => (
                            <span key={feeling}>#{feeling} </span>
                        ))}
                    </p>
                </div>
            </div>
            
            
        </div>
    )
}