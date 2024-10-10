import path from 'node:path'

export function normalizePosixPath(id: string): string {
  return path.posix.normalize(id.replace(/\\/g, '/'))
}
