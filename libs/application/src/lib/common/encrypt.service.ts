import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
@Injectable()
export class EncryptService {
  algorithm = 'aes-256-cbc';
  iv = randomBytes(16);
  key = randomBytes(32);
  async encrypt(value: string): Promise<string> {
    const cipher = createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
    const encryptedText = cipher.update(value, 'utf-8', 'hex') + cipher.final('hex');
    return encryptedText;
  }
  async decrypt(value: string): Promise<string> {
    const decipher = createDecipheriv(this.algorithm, Buffer.from(this.key), this.iv);
    const decryptedText = decipher.update(value, 'hex', 'utf-8') + decipher.final('utf-8');
    return decryptedText;
  }
}
