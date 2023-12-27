import { Buffer } from "buffer"

const SERVER_ENCRYPTION_IV_LENGTH = 12

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
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
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

export async function aesDecrypt(
  encryptedHexPayload: string,
  keyString: string,
) {
  const aesKey = await getCryptoKey(keyString) // Convert key string to cryptoKey format.
  const encryptedData = Buffer.from(encryptedHexPayload, "hex") // Convert encrypted payload in hex string to Array Buffer(Uint8Array).

  const nonce = encryptedData.subarray(0, SERVER_ENCRYPTION_IV_LENGTH)
  const data = encryptedData.subarray(SERVER_ENCRYPTION_IV_LENGTH)

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: nonce,
    },
    aesKey,
    data,
  )

  const decryptedString = new TextDecoder().decode(decrypted)
  return decryptedString
}
