
//Iterative 
function sum_to_n_iterative(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
// Complexity O(n)
// Simple to understand, works well for small n.
// Not efficient for very large values of n.

//---------------------------------------------

//Mathematical Formula
function sum_to_n_formula(n: number): number {
    return (n * (n + 1)) / 2;
}
//Complexity O(1)
//Fastest and most efficient.

//---------------------------------------------

//Recursive
function sumToNRecursive(n: number): number {
    if (n <= 1) {
        return n;
    }
    return n + sumToNRecursive(n - 1);
}
//Complexity O(n)
//Less efficient, potential stack overflow for large n.

const n = 7; 
const sum = sum_to_n_formula(n);
console.log(`Sum of numbers from 1 to ${n} is: ${sum}`);