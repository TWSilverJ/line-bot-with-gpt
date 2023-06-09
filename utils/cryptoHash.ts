import bcrypt from 'bcryptjs'
import crypto from 'crypto'

/** 產生鹽 */
export async function genSalt(rounds?: number | undefined) {
  return bcrypt.genSalt(rounds)
}

/** 產生密碼雜湊 */
export async function hash(s: string, salt: string | number): Promise<string> {
  return bcrypt.hash(s, salt)
}

/** 比對雜湊 */
export function compare(s: string, hash: string): Promise<boolean> {
  return bcrypt.compare(s, hash)
}

/** 產生 AES key */
export function generateKeyAsync() {
  return new Promise((resolve, reject) => {
    crypto.generateKey('aes', { length: 256 }, (err, key) => {
      err === null ? resolve(key.export().toString('base64')) : reject(err)
    })
  })
}

/** AES 加密 */
export function encryptByAES(data: string, key: crypto.CipherKey, iv: any = null) {
  // 轉換為 <KeyObject>
  if (typeof key === 'string') { key = crypto.createSecretKey(key, 'base64') }

  // 產生 IV
  if (!iv) { iv = crypto.randomBytes(16) }

  // 建立加密器
  const encrypter = crypto.createCipheriv('aes-256-cbc', key, iv)

  let encrypted = encrypter.update(data, 'utf8', 'base64')
  encrypted += encrypter.final('base64')
  return [iv.toString('base64'), encrypted]
}

/** AES 解密 */
export function decryptByAES(data: string, key: crypto.CipherKey, iv: crypto.BinaryLike | null) {
  // 轉換為 <KeyObject>
  if (typeof key === 'string') { key = crypto.createSecretKey(key, 'base64') }

  // 建立解密器
  const decrypter = crypto.createDecipheriv('aes-256-cbc', key, iv)

  let decrypted = decrypter.update(data, 'base64', 'utf8')
  decrypted += decrypter.final('utf8')
  return decrypted
}

/** 產生 RSA key pair */
export function generateKeyPairAsync() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    }, (err, publicKey, privateKey) => {
      const keyPair = {
        publicKey: publicKey,
        privateKey: privateKey
      }
      err === null ? resolve(keyPair) : reject(err)
    })
  })
}

/** RSA 加密 */
export function encryptByRSA(data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, key: crypto.RsaPublicKey | crypto.RsaPrivateKey | crypto.KeyLike) {
  return crypto.publicEncrypt(key, Buffer.from(data))
}

/** RSA 解密 */
export function decryptByRSA(data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, key: crypto.RsaPrivateKey | crypto.KeyLike) {
  return crypto.privateDecrypt(key, Buffer.from(data))
}

/** RSA 簽證 */
export function signRSA(data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, key: any) {
  return crypto.sign('sha256', Buffer.from(data), {
    key: key,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  })
}

/** RSA 驗證 */
export function verifyRSA(data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, key: any, signature: NodeJS.ArrayBufferView) {
  return crypto.verify('sha256', Buffer.from(data),
    {
      key: key,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    signature
  )
}

/** 雜湊 */
export function hashAsync(data: crypto.BinaryLike) {
  const hash = crypto.createHash('sha256')
  hash.update(data)

  return hash.digest('hex')
}
