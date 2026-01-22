import veryHappy from '../../assets/images/icon-very-happy-white.svg'
import happy from '../../assets/images/icon-happy-white.svg'
import neutral from '../../assets/images/icon-neutral-white.svg'
import sad from '../../assets/images/icon-sad-white.svg'
import verySad from '../../assets/images/icon-very-sad-white.svg'

const MoodImageWhite = ({mood, size = 24}) => {
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
        <img src={getMoodImage()} alt={mood} style={{width: size, height: size}} />
    )
}

export default MoodImageWhite