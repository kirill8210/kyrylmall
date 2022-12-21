const sortedSizes = (size) => {
    const sizeCharts = {
        'XS': 1,
        'S': 2,
        'M': 3,
        'L': 4,
        'XL': 5
    };

    const sortedArray = size.sort((a, b) => {
        return sizeCharts[a] - sizeCharts[b]
    });

    return sortedArray;
};

export default sortedSizes;