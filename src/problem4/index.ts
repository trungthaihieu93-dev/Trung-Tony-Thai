function sum_to_n_a(n: number): number {
  // Iterative approach: Using a loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
}

function sum_to_n_b(n: number): number {
  // Mathematical approach: Using the formula n * (n + 1) / 2
  return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
  // Recursive approach
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
}

// Example usage:
console.log(sum_to_n_a(10)); // Output: 55
console.log(sum_to_n_b(10)); // Output: 55
console.log(sum_to_n_c(10)); // Output: 55
