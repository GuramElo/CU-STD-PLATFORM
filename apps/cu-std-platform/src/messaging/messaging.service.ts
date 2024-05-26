import { Injectable, Logger } from '@nestjs/common';
import {
  IMailOptions,
  MAIL_OPTIONS_BASE,
  TRANSPORTER_CONFIG,
} from './messaging.config';
import { createTransport } from 'nodemailer';
import { randomBytes } from 'crypto';
@Injectable()
export class MessagingService {
  private readonly transporter = createTransport(TRANSPORTER_CONFIG);
  public async sendMail$(messageDTO: Partial<IMailOptions>) {
    return await new Promise((resolve) => {
      const options = {
        ...MAIL_OPTIONS_BASE,
        ...messageDTO,
      };
      this.transporter.sendMail(options, (error, info) => {
        if (error) {
          Logger.error('Error:', error.message);
          Logger.error('Error Details:', error);
          resolve(null);
        } else {
          resolve({});
          Logger.log('Email sent:', info.response);
        }
      });
    });
  }
  generateRandomString(length = 6) {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, length); // return required number of characters
  }
}
