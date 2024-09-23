export function randomInt(minInt, maxInt) {
  return minInt + Math.floor(Math.random() * (maxInt + 1 - minInt));
}
