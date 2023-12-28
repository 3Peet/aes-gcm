import { Buffer } from "buffer"

const IV_LENGTH = 12

async function getCryptoKey(key: string) {
  const rawKey = Buffer.from(key, "base64")
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    rawKey,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"],
  )
  return cryptoKey
}

/*
  Get the encoded message, encrypt it and display a representation
  of the ciphertext in the "Ciphertext" element.
  */
export async function encryptFile(file: File, keyStr: string) {
  const fileBuffer = await file.arrayBuffer()

  const aesKey = await getCryptoKey(keyStr)
  // The iv must never be reused with a given key.
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH))
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    aesKey,
    fileBuffer,
  )
  return encrypted
}

export async function decryptFile(file: File, keyStr: string) {
  const fileBuffer = await file.arrayBuffer()
  const aesKey = await getCryptoKey(keyStr) // Convert key string to cryptoKey format.

  const iv = fileBuffer.slice(0, IV_LENGTH)
  const ciphertext = fileBuffer.slice(IV_LENGTH)
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    aesKey,
    ciphertext,
  )
  return decrypted
}
