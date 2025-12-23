export async function withAuthRetry<T>(
  fn: () => Promise<T>
): Promise<T> {
  try {
    return await fn()
  } catch (error: any) {
    if (error?.status === 401) {
      // refresh
      return await fn()
    }
    throw error
  }
}
