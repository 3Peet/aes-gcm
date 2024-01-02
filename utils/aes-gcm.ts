const IV_LENGTH = 12

async function getCryptoKey(key: string) {
  const keyBytes = Uint8Array.from(atob(key), (c) => c.charCodeAt(0))
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"],
  )
  return cryptoKey
}

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
