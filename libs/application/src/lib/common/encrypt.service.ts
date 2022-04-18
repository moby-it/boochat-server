import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv } from 'crypto';
@Injectable()
export class EncryptService {
  constructor(private config: ConfigService) {
    const key = this.config.get<string>('ENCRYPTION_KEY');
    if (!key) throw new Error('no present key for encryption');
    this.key = key.slice(0, 32);
  }
  algorithm = 'aes-256-cbc';
  iv = 'ad8be4d4-b4bc-4921-9657-55c62fffada4'.slice(0, 16);
  key: string;

  async encrypt(value: string): Promise<string> {
    // return value;
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    const encryptedText = cipher.update(value, 'utf-8', 'hex') + cipher.final('hex');
    return encryptedText;
  }
  async decrypt(value: string): Promise<string> {
    // return value;
    const decipher = createDecipheriv(this.algorithm, Buffer.from(this.key), this.iv);
    const decryptedText = decipher.update(value, 'hex', 'utf-8') + decipher.final('utf-8');
    return decryptedText;
  }
}
