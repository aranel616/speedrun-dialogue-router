import { traverse } from "./functions/traverse";
import { script } from "./scripts/lifeisstrange/episode1";

const startTime = performance.now();
let endTime;

const [shortestLength, shortestPath, finalContext] = traverse(script, "start", 0, {}, 0);

console.log(`Shortest dialogue length: ${shortestLength}`);
console.log("");

console.log("Shortest path:");
for (const step of shortestPath) {
    console.log(step);
}
console.log("");

console.log("Context:");
console.log(finalContext);
console.log("");

endTime = performance.now(); // Record end time
const executionTimeMilliseconds = endTime - startTime;
const executionTimeSeconds = executionTimeMilliseconds / 1000; // Convert to seconds
console.log("Script execution time: " + executionTimeSeconds + " seconds");