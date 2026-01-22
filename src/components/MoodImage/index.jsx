import veryHappy from '../../assets/images/icon-very-happy-color.svg'
import happy from '../../assets/images/icon-happy-color.svg'
import neutral from '../../assets/images/icon-neutral-color.svg'
import sad from '../../assets/images/icon-sad-color.svg'
import verySad from '../../assets/images/icon-very-sad-color.svg'

const MoodImage = ({mood}) => {
    const getMoodImage = () => {
        switch (mood) {
            case "Very Happy":
                return veryHappy
            case "Happy":
                return happy
            case "Neutral":
                return neutral
            case "Sad":
                return sad
            case "Very Sad":
                return verySad
            default:
                return null;
        }
    }

    return (
        <img src={getMoodImage()} alt={mood} className='mood-image' />
    )
}

export default MoodImage