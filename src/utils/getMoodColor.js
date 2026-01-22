const getMoodColor = (mood) => {
    switch(mood) {
        case 'Very Sad':
            return 'very-sad';
        case 'Sad':
            return 'sad';
        case 'Neutral':
            return 'neutral';
        case 'Happy':
            return 'happy';
        case 'Very Happy':
            return 'very-happy';
        default:
            return 'neutral';
    }
};
    
export default getMoodColor;