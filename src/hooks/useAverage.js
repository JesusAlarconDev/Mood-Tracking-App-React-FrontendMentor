const useAverage = (last10Registers, property, hierarchy) => {
    if (!last10Registers || last10Registers.length < 10) {
        return { 
            moodTrend: 'same', 
            average: null 
        };
    }
    const last5Moods = last10Registers.slice(-5);
    const previous5Moods = last10Registers.slice(-10, -5);

    const getMostFrequent = (moods) => {
        const moodCount = {};
        
        moods.forEach(item => {
            const value = item[property]; 
            moodCount[value] = (moodCount[value] || 0) + 1;
        });
        let maxCount = 0;
        let mostFrequent = null;
        let lastIndex = -1;
        // Find most frequent
        for (const [value, count] of Object.entries(moodCount)) {
            if (count > maxCount || 
                (count === maxCount && moods.lastIndexOf(moods.find(m => m[property] === value)) > lastIndex)) {
                maxCount = count;
                mostFrequent = value;
                lastIndex = moods.lastIndexOf(moods.find(m => m[property] === value));
            }
        }
        return mostFrequent;
    };

    const currentMostFrequent = getMostFrequent(last5Moods);
    const previousMostFrequent = getMostFrequent(previous5Moods);
    
    let trend = 'same';
    if (previousMostFrequent) {
        const currentLevel = hierarchy[currentMostFrequent] || 0;
        const previousLevel = hierarchy[previousMostFrequent] || 0;
        if (currentLevel > previousLevel) {
            trend = 'increase';
        } else if (currentLevel < previousLevel) {
            trend = 'decrease';
        }
    }

    return {
        trend: trend,
        average: currentMostFrequent
    };
}

export default useAverage;