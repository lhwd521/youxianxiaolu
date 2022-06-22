function sum(n) {
  if (n == 1) {
    return 1;
  }
  return sum(n - 1) + n;
}

console.log(sum(100000));

function sum1(n) {
  let m = 0;
  for (let i = 1; i <= n; i++) {
    m = m + i;
  }
  return m;
}

console.log(sum1(10000000000));
