import MoodImageWhite from '../MoodImageWhite/index';
import TrendImage from '../TrendImage/index';
import sleepIcon from '../../assets/images/icon-sleep.svg'
import getMoodColor from '../../utils/getMoodColor';
import useAverage from '../../hooks/useAverage';
import './index.css';

const AveragesComponent = ({last10Registers}) => {

    const moodHierarchy = {
        'Very Happy': 5,
        'Happy': 4,
        'Neutral': 3,
        'Sad': 2,
        'Very Sad': 1
    };

    const sleepHierarchy = {
        '0-2': 1,
        '3-4': 2,
        '5-6': 3,
        '7-8': 4,
        '9+': 5
    };
    
    const {average: averageMood, trend: moodTrend} = useAverage(last10Registers, "todaysMood", moodHierarchy);

    // Cuando no hay suficientes datos cargados (Minimo 10 registros)
    if(averageMood == null){
        return (
            <div className='average-container'>
                <div className='average-mood-container'>
                    <h3>Average Mood <span className='text-preset-7'>(Last 5 Check-ins)</span></h3>
                    <div className='average-mood no-data'>
                        <h4>Keep tracking!</h4>
                        <p>Log 5 check-ins to see your average mood.</p>
                    </div>
                </div>

                <div className='average-sleep-container'>
                    <h3>Average Sleep <span className='text-preset-7'>(Last 5 Check-ins)</span></h3>
                    <div className='average-sleep no-data'>
                        <h4>Not enough data yet!</h4>
                        <p>Track 5 nights to view average sleep.</p>
                    </div>
                </div>
            </div>
        )
    } else {
        const {average: averageSleep, trend: sleepTrend} = useAverage(last10Registers, "sleepHours", sleepHierarchy);

        return (
            <div className='average-container'>
                <div className='average-mood-container'>
                    <h3>Average Mood <span className='text-preset-7'>(Last 5 Check-ins)</span></h3>
                    <div className={`average-mood ${getMoodColor(averageMood)}`}>
                        <h4><MoodImageWhite mood={averageMood} size={24} />{averageMood}</h4>
                    <p> <TrendImage trend={moodTrend} /> {moodTrend === 'increase' ? 'Increased from' : moodTrend === 'decrease' ? 'Decreased from' : 'Same as'} the previous 5 check-ins</p>
                    </div>
                </div>

                <div className='average-sleep-container'>
                    <h3>Average Sleep <span className='text-preset-7'>(Last 5 Check-ins)</span></h3>
                    <div className='average-sleep'>
                        <h4><img src={sleepIcon} alt="Sleep Icon" /> {averageSleep} Horas</h4>
                        <p><TrendImage trend={sleepTrend} /> {sleepTrend === 'increase' ? 'Increased from' : sleepTrend === 'decrease' ? 'Decreased from' : 'Same as'} the previous 5 check-ins</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AveragesComponent