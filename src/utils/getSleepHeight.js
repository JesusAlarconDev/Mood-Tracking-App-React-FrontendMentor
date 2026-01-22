const getSleepHeight = (sleep) => {
    switch (sleep) {
        case '9+':
            return 'h-100';
        case '7-8':
            return 'h-75';
        case '5-6':
            return 'h-50';
        case '3-4':
            return 'h-25';
        case '0-2':
            return 'h-10';
        default:
            return 'h-50';
    }
}

export default getSleepHeight;