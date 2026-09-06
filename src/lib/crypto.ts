// src/lib/crypto.ts
export async function encryptLetterContent(
  plainText: string,
  secretPass: string
): Promise<string> {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // পাসওয়ার্ড থেকে কী ডেরিভেশন
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(secretPass),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  // AES-GCM দিয়ে এনক্রিপশন
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plainText)
  );

  // Salt + IV + Encrypted Data একসাথে বাইন্ড করে Base64 স্ট্রিং তৈরি
  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encrypted), salt.length + iv.length);

  return btoa(String.fromCharCode(...combined));
}

// src/lib/crypto.ts

// বিদ্যমান encryptLetterContent এর নিচে এটি যোগ করুন:
export async function decryptLetterContent(
  encryptedBase64: string,
  secretPass: string
): Promise<string> {
  const binaryData = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));

  // প্রথম ১৬ বাইট Salt এবং পরের ১২ বাইট IV
  const salt = binaryData.slice(0, 16);
  const iv = binaryData.slice(16, 28);
  const data = binaryData.slice(28);

  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(secretPass),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  return new TextDecoder().decode(decrypted);
}

export const PUBLIC_VAULT_KEY = 'UNSEAL_PROTOCOL_PUBLIC_VAULT_DECRYPT_2026';

export async function decryptPublicLetter(encryptedBase64: string): Promise<string> {
  try {
    return await decryptLetterContent(encryptedBase64, PUBLIC_VAULT_KEY);
  } catch {
    // যদি কোনো চিঠি সরাসরি প্লেইনটেক্সট বা পুরনো ফরম্যাটে থাকে
    return encryptedBase64;
  }
}