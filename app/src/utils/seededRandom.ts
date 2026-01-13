export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function generateDailySeed(): number {
  const now = new Date()
  // Create a seed based on YYYYMMDD
  const seedString = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`
  return parseInt(seedString, 10)
}
