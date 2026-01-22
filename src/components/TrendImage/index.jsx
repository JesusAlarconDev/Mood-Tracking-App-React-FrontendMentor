import trendIncrease from '../../assets/images/icon-trend-increase.svg'
import trendDecrease from '../../assets/images/icon-trend-decrease.svg'
import trendSame from '../../assets/images/icon-trend-same.svg'

const TrendImage = ({trend}) => {
    const getTrendImage = () => {
        switch (trend) {
            case 'increase':
                return trendIncrease
            case 'decrease':
                return trendDecrease
            case 'same':
                return trendSame
            default:
                return null
        }
    }

    return (
        <img src={getTrendImage()} alt={trend} />
    )
}

export default TrendImage