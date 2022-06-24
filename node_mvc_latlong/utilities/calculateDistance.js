const calculateDistance = (coordinate1, coordinate2) => {
    const distance = Math.sqrt(Math.pow(Number(coordinate1.x) - Number(coordinate2.x), 2) + Math.pow(Number(coordinate1.y) - Number(coordinate2.y), 2));
    return distance;
} 

module.exports = calculateDistance;