// import {createApiFetch} from '~/core/api.fetch'
// import {useRuntimeConfig} from '#app'
// import {useI18n} from 'vue-i18n'
// import type {
//   CompleteProfileRequest,
//   CompleteProfileResponse,
//   SendOtpRequest,
//   SendOtpResponse,
//   VerifyOtpRequest,
//   VerifyOtpResponse
// } from '~/types/SignIn'
//
// export const useAuthApi = () => {
//   const config = useRuntimeConfig()
//   const { locale } = useI18n()
//   const lang = locale.value
//
//   const apiFetch = createApiFetch(config.public.apiBase)
//
//   const sendOtp = (payload: SendOtpRequest) => {
//     return apiFetch<SendOtpResponse>('/users/auth/send-otp/', {
//       method: 'POST',
//       body: payload,
//       credentials: 'include',
//       async onRequest({ options }) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   const verifyOtp = (payload: VerifyOtpRequest) => {
//     return apiFetch<VerifyOtpResponse>('/users/auth/verify-otp/', {
//       method: 'POST',
//       body: payload,
//       credentials: 'include',
//       async onRequest({ options }) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   const completeProfile = (payload: CompleteProfileRequest) => {
//     return apiFetch<CompleteProfileResponse>('/users/auth/complete-profile/', {
//       method: 'POST',
//       body: payload,
//       credentials: 'include',
//       async onRequest({ options }) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   return { sendOtp, verifyOtp, completeProfile }
// }


import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import type {
  CompleteProfileRequest,
  CompleteProfileResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse
} from '~/types/SignIn'

export const useAuthApi = () => {
  const { locale } = useI18n()
  const lang = locale.value

  const sendOtp = (payload: SendOtpRequest) => {
    return apiFetch<SendOtpResponse>('/users/auth/send-otp/', {
      method: 'POST',
      body: payload,
      credentials: 'include',
      async onRequest({ options }) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  const verifyOtp = (payload: VerifyOtpRequest) => {
    return apiFetch<VerifyOtpResponse>('/users/auth/verify-otp/', {
      method: 'POST',
      body: payload,
      credentials: 'include',
      async onRequest({ options }) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  const completeProfile = (payload: CompleteProfileRequest) => {
    return apiFetch<CompleteProfileResponse>('/users/auth/complete-profile/', {
      method: 'POST',
      body: payload,
      credentials: 'include',
      async onRequest({ options }) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  return { sendOtp, verifyOtp, completeProfile }
}
