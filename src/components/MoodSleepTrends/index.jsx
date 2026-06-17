import MoodImageWhite from "../MoodImageWhite/index"
import getMoodColor from '../../utils/getMoodColor';
import sleepIcon from '../../assets/images/icon-sleep.svg';
import getSleepHeight from '../../utils/getSleepHeight';
import './index.css';

const MoodSleepTrends = ({moodRegisters}) => {

    const getMonth = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-US', { month: 'short' });
    }

    const getDay = (isoDate) => {
        const date = new Date(isoDate);
        return date.getDate().toString().padStart(2, '0');
    }

    return (
        <div className="mood-sleep-trends-container">
            <h2>Mood and sleep trends</h2>

            <div className="table-layout">

              <div className="y-labels">
                <div><img src={sleepIcon} alt="sleep" /> 9+ hours</div>
                <div><img src={sleepIcon} alt="sleep" /> 7-8 hours</div>
                <div><img src={sleepIcon} alt="sleep" /> 5-6 hours</div>
                <div><img src={sleepIcon} alt="sleep" /> 3-4 hours</div>
                <div><img src={sleepIcon} alt="sleep" /> 0-2 hours</div>
              </div>

              <div className="graph-area">

                <div className="graph-background-lines">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>

                {
                    moodRegisters.map((register, index) => (
                        <div className="bar-container" key={index}>
                          <div className={`bar ${getMoodColor(register.todaysMood)} ${getSleepHeight(register.sleepHours)}`}>
                            <div className="icon"><MoodImageWhite mood={register.todaysMood} size={38} /></div>
                          </div>
                          <div className="date">{getMonth(register.createdAt)} <span>{getDay(register.createdAt)}</span></div>
                        </div>
                    ))
                }
              </div>
            </div>
        </div>
    )
}

export default MoodSleepTrends