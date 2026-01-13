export const GAME_EPOCH = new Date('2026-01-13T00:00:00')

export function getDayNumber(): number {
  const now = new Date()
  // Reset time part for accurate day difference calculation based on local time
  const current = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const start = new Date(GAME_EPOCH.getFullYear(), GAME_EPOCH.getMonth(), GAME_EPOCH.getDate())

  const diffTime = current.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays + 1
}
