const getMoodQuote = (mood) => {
    const moodQuotes = {
    "Very Sad": [
      "You are stronger than you think; the storm will pass.",
      "It's okay to cry. Healing begins when you let your feelings flow.",
      "Even in darkness, a spark of hope can shine bright.",
      "This moment is tough, but you've overcome challenges before.",
      "A gentle step forward, no matter how small, is still progress."
    ],
    "Sad": [
      "Pain is temporary, brighter days lie ahead.",
      "Each setback is a chance to grow and learn.",
      "One small positive thought can change your entire day.",
      "It's okay to rest; self-care isn't selfish.",
      "Healing takes time - be patient and kind to yourself."
    ],
    "Neutral": [
      "A calm mind can find opportunity in every moment.",
      "Sometimes the greatest triumph is simply finding peace.",
      "Take a moment to breathe; every breath is a fresh start.",
      "Even an ordinary day can hold a pleasant surprise.",
      "Balance isn't found, it's created."
    ],
    "Happy": [
      "Happiness grows when it's shared with others.",
      "Celebrate even the small victories to make life extraordinary.",
      "Gratitude can turn what you have into enough.",
      "Keep smiling; your joy can be contagious.",
      "Where focus goes, energy flows - keep your focus on what lifts you."
    ],
    "Very Happy": [
      "When your heart is full, share your light with the world.",
      "Savor the highs in life; they become precious memories.",
      "Joy multiplies when spread among friends.",
      "Trust your journey; you're in a beautiful place right now.",
      "Let your happiness ripple out and inspire others."
    ]
    };
    
    return moodQuotes[mood][Math.floor(Math.random() * moodQuotes[mood].length)];
}

export default getMoodQuote;
