import React from 'react'
import veryHappy from '../../assets/images/icon-very-happy-color.svg'
import happy from '../../assets/images/icon-happy-color.svg'
import neutral from '../../assets/images/icon-neutral-color.svg'
import sad from '../../assets/images/icon-sad-color.svg'
import verySad from '../../assets/images/icon-very-sad-color.svg'
import './index.css'

const Loading = () => {
    const moods = [veryHappy, happy, neutral, sad, verySad];

    return (
        <div className='loading-container'>
            {moods.map((mood, index) => (
                <img 
                    key={index}
                    src={mood} 
                    alt={`mood-${index}`} 
                    className='loading-mood'
                    style={{ animationDelay: `${index * 0.15}s` }}
                />
            ))}
        </div>
    )
}

export default Loading
