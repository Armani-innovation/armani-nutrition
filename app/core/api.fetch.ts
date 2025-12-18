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

        await $fetch('users/auth/refresh/', {
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


// import { $fetch } from 'ofetch'
// import type { FetchContext } from 'ofetch'
// import { navigateTo } from '#app'
//
// export const createApiFetch = (baseURL: string) => {
//   const apiFetch = $fetch.create({
//     baseURL,
//     timeout: 15000,
//     retry: 0,
//     credentials: 'include',
//
//     async onResponseError(context: FetchContext<any, any>) {
//       const { request, response, options } = context
//
//       if (response?.status === 401) {
//         try {
//           // refresh token
//           await $fetch('users/auth/refresh/', {
//             method: 'POST',
//             baseURL,
//             credentials: 'include'
//           })
//
//           // retry همان request
//           if (typeof request === 'string') {
//             return apiFetch(request, options)
//           } else {
//             return apiFetch(request.url, options)
//           }
//         } catch (err) {
//           console.error('Refresh token failed:', err)
//           navigateTo('/')
//           return null // return null به جای throw، اجرای توابع بعدی ادامه پیدا کنه
//         }
//       }
//
//       // سایر خطاها را فقط لاگ می‌کنیم و null برمی‌گردانیم
//       console.error('API Error:', response?.status, response?.statusText)
//       return null
//     }
//   })
//
//   return apiFetch
// }
//
// export const apiFetch = createApiFetch('/api')
