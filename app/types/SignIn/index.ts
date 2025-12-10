interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
  regex: RegExp
  placeholder: string
}

interface SendOtpRequest {
  phone: string
}

interface SendOtpResponse {
  detail: string
  exists: boolean
}

interface VerifyOtpRequest {
  phone: string
  code: string
}

interface User {
  id: number
  phone: string
  first_name: string
  last_name: string
}

interface Tokens {
  access: string
  refresh: string
}

interface VerifyOtpResponse {
  detail: string
  user: User
  tokens: Tokens
  is_new: boolean
}

interface CompleteProfileRequest {
  first_name: string
  last_name: string
}

interface CompleteProfileResponse {
  status: 'completed'
  user_id: number
  first_name: string
  last_name: string
}

export type {
  Country,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  CompleteProfileRequest,
  CompleteProfileResponse
}