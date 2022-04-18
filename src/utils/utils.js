export const amountPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
        points = 2 * (amount - 100) + 50;
    } else if (amount > 50 && amount <= 100) {
        points = amount - 50;
    } else {
        points = 0;
    }

    return points;
};