import * as bcrypt from 'bcrypt';

export class BaseUtils {
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static generateHsh(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   *
   * @param password
   * @param hashedPassword
   * @returns
   */
  static verifyHash(password: string, hashedPassword = ''): Promise<boolean> {
    if (!password || !hashedPassword) {
      Promise.resolve(false);
    }
    return bcrypt.compare(password, hashedPassword);
  }
}
