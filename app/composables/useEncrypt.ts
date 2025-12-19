import CryptoJS from 'crypto-js'
import { useRuntimeConfig } from '#app'

export function useEncrypt() {
  const config = useRuntimeConfig()
  const SECRET_KEY = config.ENCRYPT_KEY ?? 'fallback-key'

  const encrypt = (value: string): string => {
    return encodeURIComponent(
      CryptoJS.AES.encrypt(value, SECRET_KEY).toString()
    )
  }


  const decrypt = (encrypted: string): string => {
    const decoded = decodeURIComponent(encrypted)
    const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  return { encrypt, decrypt }
}
