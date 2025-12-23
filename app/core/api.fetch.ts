import { $fetch } from 'ofetch'
import { navigateTo } from '#app'
import type { FetchContext } from 'ofetch'

let isRefreshing = false
let refreshPromise: Promise<void> | null = null

export const apiFetch = $fetch.create({
  baseURL: '/api',
  credentials: 'include',
  retry: 0,

  async onResponseError({ response }) {
    if (response?.status !== 401) {
      throw response
    }

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          await $fetch('users/auth/refresh/', {
            method: 'POST',
            baseURL: '/api',
            credentials: 'include'
          })
        } catch {
          if (process.client) {
            await navigateTo('/')
          }
          throw new Error('Unauthenticated')
        } finally {
          refreshPromise = null
        }
      })()
    }

    await refreshPromise
  }
})
