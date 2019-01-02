import KMeans from './kmeans';
import example_data from './data';

console.log("\nML in JavaScript (Clustering)");
console.log("===============================\n");
console.log("Testing centroid generation.");
console.log("===============================\n");

const ex_randomCentroids_solver = new KMeans(2, example_data.example_randomCentroids);

console.log("Randomly initialized centroids: ");
console.log(ex_randomCentroids_solver.centroids);
console.log("\n------------------------------------------------------------\n\n");