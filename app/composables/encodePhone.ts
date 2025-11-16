import CryptoJS from 'crypto-js'
import { useRuntimeConfig } from '#app'

export function useEncrypt() {
  const config = useRuntimeConfig()
  const SECRET_KEY = config.ENCRYPT_KEY ?? 'fallback-key'  // همیشه string

  const encrypt = (value: string): string => {
    if (!SECRET_KEY) throw new Error('SECRET_KEY is not defined')
    return CryptoJS.AES.encrypt(value, SECRET_KEY).toString()
  }

  const decrypt = (encrypted: string): string => {
    if (!SECRET_KEY) throw new Error('SECRET_KEY is not defined')
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  return { encrypt, decrypt }
}
