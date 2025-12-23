import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
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

  const sendOtp = (payload: SendOtpRequest) =>
    withAuthRetry<SendOtpResponse>(() =>
      apiFetch('/users/auth/send-otp/', {
        method: 'POST',
        body: payload,
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const verifyOtp = (payload: VerifyOtpRequest) =>
    withAuthRetry<VerifyOtpResponse>(() =>
      apiFetch('/users/auth/verify-otp/', {
        method: 'POST',
        body: payload,
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const completeProfile = (payload: CompleteProfileRequest) =>
    withAuthRetry<CompleteProfileResponse>(() =>
      apiFetch('/users/auth/complete-profile/', {
        method: 'POST',
        body: payload,
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  return {
    sendOtp,
    verifyOtp,
    completeProfile
  }
}