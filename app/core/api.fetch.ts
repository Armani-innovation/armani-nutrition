import {$fetch} from 'ofetch'
import type {FetchContext} from 'ofetch'
import {navigateTo} from '#app'

export const createApiFetch = (baseURL: string) => {
  const apiFetch = $fetch.create({
    baseURL,
    timeout: 15000,
    retry: 0,
    credentials: 'include',

    async onResponseError(context: FetchContext<any, any>) {
      const {request, response, options} = context

      if (response?.status !== 401) throw response

      try {

        await $fetch('token/refresh/', {
          method: 'POST',
          baseURL,
          credentials: 'include'
        })

        if (typeof request === 'string') {
          return apiFetch(request, options)
        } else {
          return apiFetch(request.url, options)
        }

      } catch {
        navigateTo('/')
      }
    }
  })

  return apiFetch
}

export const apiFetch = createApiFetch('/api')
