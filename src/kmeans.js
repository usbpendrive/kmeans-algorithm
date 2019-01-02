/**
 * Calculate the mean of an array of numbers.
 * @param {Array.<number>} numbers
 * @type {number}
 */
const mean = numbers => numbers.reduce((sum, val) => sum + val, 0) / numbers.length;

/**
 * Calculate the distance between two points.
 * Points must be given as arrays or objects with equivalent keys.
 * @param {Array.<number>} a
 * @param {Array.<number>} b
 * @returns {number}
 */
const distance = (a, b) => Math.sqrt(
    a.map((aPoint, i) => b[i] - aPoint)
        .reduce((sumOfSquares, diff) => sumOfSquares + (diff*diff), 0)
);

class KMeans {
    /**
     * @param k
     * @param data
     */
    constructor(k, data) {
        this.k = k;
        this.data = data;
        this.reset();
    }

    /**
     * Reset the solver state; use this if you wish to run the
     * same solver instance again with the same data points
     * but different initial conditions.
     */
    reset() {
        this.error = null;
        this.iterations = 0;
        this.iterationLogs = [];
        this.centroids = this.initRandomCentroids();
        this.centroidAssignments = [];
    }

    /**
     * Determines the number of dimensions in the dataset.
     * @returns {number}
     */
    getDimensionality() {
        const point = this.data[0];
        return point.length;
    }

    /**
     * For a given dimension in the dataset, determine the minimum
     * and maximum value. This is used during random initialization
     * to make sure the random centroids are in the same range as
     * the data.
     *
     * @param n
     * @returns {{min: number, max: number}}
     */
    getRangeForDimension(n) {
        const values = this.data.map(point => point[n]);
        return {
            min: Math.min.apply(null, values),
            max: Math.max.apply(null, values)
        };
    }

    /**
     * Get range for all dimensions.
     * @see getRangeForDimension
     * @returns {Array}
     */
    getAllDimensionRanges() {
        const dimensionRanges = [];
        const dimensionality = this.getDimensionality();

        for (let dimension = 0; dimension < dimensionality; dimension++) {
            dimensionRanges[dimension] = this.getRangeForDimension(dimension);
        }

        return dimensionRanges;
    }

    /**
     * Initializes random centroids, using the ranges of the data
     * to set the minimum and maximum bounds for the centroids.
     * @see getAllDimensionRanges
     * @see getRangeForDimension
     * @returns {Array}
     */
    initRandomCentroids() {
        const dimensionality = this.getDimensionality();
        const dimensionRanges = this.getAllDimensionRanges();
        const centroids = [];

        for (let i = 0; i < this.k; i++) {
            let point = [];
            for (let dimension = 0; dimension < dimensionality; dimension++) {
                const { min, max } = dimensionRanges[dimension];
                point[dimension] = min + (Math.random()*(max-min));
            }
            centroids.push(point);
        }

        return centroids;
    }
}

export default KMeans;